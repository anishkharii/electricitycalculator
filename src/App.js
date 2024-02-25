import React, { useState, useEffect } from "react";
import ElectricComponent from "./electricComponent";
import ComponentData from "./data-file";
import { X } from "lucide-react";
import "./App.css";

const App = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [calculatedUnits, setCalculatedUnits] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

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
  };

  const handleCalculateUnits = () => {
    let calculatedResult = 0;
    items.forEach((item) => {
      let unit = (item.watts * item.usagePerDay * item.totalDevices) / 1000;
      calculatedResult += unit;
    });

    setCalculatedUnits(calculatedResult);
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
      <div className="header">
        <h2>Electricity Calculator</h2>
        <h6>Created with ❤️ by Anish Khari</h6>
      </div>

      <h3>Add Items</h3>

      <div className="search-bar">

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      </div>

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
        {
          filteredItems.length===0 &&(
            <h4>No such Item found.</h4>
          )
        }
      </div>

      <button className="clear-btn" onClick={handleDeleteAllData}>
        Clear All
      </button>

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

      {items.length >= 1 && (
        <button className="calc-btn" onClick={handleCalculateUnits}>
          Calculate Units
        </button>
      )}

      {calculatedUnits !== null && (
        <div>
          <h3>Estimated Electricity Units:</h3>
          <h3>Daily Units: {Math.round(calculatedUnits * 100) / 100} kWh</h3>
          <h3>Weekly Units: {Math.round(calculatedUnits * 7 * 100) / 100} kWh</h3>
          <h3>15 Days Units: {Math.round(calculatedUnits * 15 * 100) / 100} kWh</h3>
          <h3>30 Days Units: {Math.round(calculatedUnits * 30 * 100) / 100} kWh</h3>
        </div>
      )}
    </div>
  );
};

export default App;
