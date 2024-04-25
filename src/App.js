import React, { useState, useEffect, useRef } from "react";

import jsPDF from "jspdf";
import "jspdf-autotable";
import ElectricComponent from "./Component/electricComponent";
import ComponentData from "./data-file";
import { ArrowDownToLine, X, ExternalLink } from "lucide-react";
import "./App.css";
import Prompt from "./Component/prompt";
import Loader from "./Component/loader";
import Header from "./Component/header";

const App = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [calculatedUnits, setCalculatedUnits] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isMounted, calculatedUnits]);

  const handleAddItem = (item) => {
    const updatedItems = [...items, item];
    setItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleDeleteAllData = () => {
    setItems([]);
    setCalculatedUnits(null);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCalculateUnits = async () => {
    let calculatedResult = 0;
    setIsLoading(true);
    await setTimeout(() => {
      setIsLoading(false);
      items.forEach((item) => {
        let unit = (item.watts * item.usagePerDay * item.totalDevices) / 1000;
        calculatedResult += unit;
      });

      setCalculatedUnits(calculatedResult);
    }, 2500);
  };
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add URL and title to the PDF
    const url = "https://electricitycalculator.vercel.app";
    const title = "Electricity Calculator";
    const subtitle = "Created by Anish Khari";

    // Set font styles for the header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);

    // Add header text
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    // Set font styles for the subtitle
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Add subtitle text
    doc.text(subtitle, doc.internal.pageSize.getWidth() / 2, 30, {
      align: "center",
    });

    // Set font styles for the URL
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Add URL text
    doc.textWithLink(`URL: ${url}`, 10, 40, { url, align: "left" });

    // Create an array with table data
    const tableData = items.map((item, index) => [
      `${index + 1}.`,
      item.name,
      item.totalDevices,
      `${item.watts}W`,
      `${item.usagePerDay} Hrs.`,
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [["S.No.", "Name", "No. of Devices", "Watts", "Usage/Day"]],
      body: tableData,
      startY: 60,
    });

    // Add estimated electricity units
    const startY = doc.autoTable.previous.finalY + 10;
    doc.text("Estimated Electricity Units:", 10, startY);
    doc.text(
      `Daily Units: ${Math.round(calculatedUnits * 100) / 100} kWh`,
      20,
      startY + 10
    );
    doc.text(
      `Weekly Units: ${Math.round(calculatedUnits * 7 * 100) / 100} kWh`,
      20,
      startY + 20
    );
    doc.text(
      `15 Days Units: ${Math.round(calculatedUnits * 15 * 100) / 100} kWh`,
      20,
      startY + 30
    );
    doc.text(
      `30 Days Units: ${Math.round(calculatedUnits * 30 * 100) / 100} kWh`,
      20,
      startY + 40
    );

    // Add sharing message
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      "Share this website with your friends and family!",
      10,
      doc.internal.pageSize.getHeight() - 10
    );

    // Save the PDF
    doc.save("electricity_units.pdf");
  };

  const handleSliderTouchStart = () => {
    document.getElementsByClassName("items-container")[0].style.overflowX =
      "hidden";
  };

  const handleSliderTouchEnd = () => {
    document.getElementsByClassName("items-container")[0].style.overflowX =
      "auto";
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = ComponentData.filter((data) =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">

      {/*   -------Pop Up Clear All ------- */}
      {prompt ? (
        <Prompt
          closePrompt={() => setPrompt(false)}
          clearAll={() => {
            handleDeleteAllData();
            setPrompt(false);
          }}
          totalItems={items.length}
        />
      ) : null}


      {/*   -------Loader ------- */}
      {isLoading ? <Loader /> : null}

      {/*   ------- Header ------- */}
      <Header/>

      {/*   ------- Search Bar ------- */}
      <div className="search-bar">
        <h3>Search Items</h3>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/*   ------- Items Container ------- */}
      <div className="items-container">
        {filteredItems.map((data, index) => (
          <ElectricComponent
            key={index}
            name={data.name}
            imageUrl={data.imageUrl}
            minWatts={data.minWatts}
            maxWatts={data.maxWatts}
            step={data.step}
            onAdd={handleAddItem}
            onTouchStart={handleSliderTouchStart}
            onTouchEnd={handleSliderTouchEnd}
          />
        ))}
        {filteredItems.length === 0 && <h4>No such Item found.</h4>}
      </div>



      {/*   ------- Clear All Button ------- */}
      <button className="button clear-btn" onClick={() => setPrompt(true)}>
        Clear All
      </button>


      {/*   ------- Table ------- */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>No. of Devices</th>
              <th>Watts</th>
              <th>Usage/Day</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{`${index + 1}.`}</td>
                <td style={{ fontWeight: "bold" }}>{item.name}</td>
                <td>{item.totalDevices}</td>
                <td>{`${item.watts}W`}</td>
                <td>{`${item.usagePerDay} Hrs.`}</td>
                <td className="delete-icon">
                  <X onClick={() => handleDeleteItem(index)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*   ------- Calculate Units Button ------- */}
      {items.length >= 1 && (
        <button className="button calc-btn" onClick={handleCalculateUnits}>
          Calculate Units
        </button>
      )}


      {/*   ------- Result Section ------- */}
      {calculatedUnits !== null && (
        <div ref={bottomRef}>
          <h3>Estimated Electricity Units:</h3>
          <h3>Daily Units: {Math.round(calculatedUnits * 100) / 100} kWh</h3>
          <h3>
            Weekly Units: {Math.round(calculatedUnits * 7 * 100) / 100} kWh
          </h3>
          <h3>
            15 Days Units: {Math.round(calculatedUnits * 15 * 100) / 100} kWh
          </h3>
          <h3>
            30 Days Units: {Math.round(calculatedUnits * 30 * 100) / 100} kWh
          </h3>
          <button className="button download-btn" onClick={handleDownloadPDF}>
            Download <ArrowDownToLine size={20} />
          </button>
        </div>
      )}

      
    </div>
  );
};

export default App;
