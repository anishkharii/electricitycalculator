import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import ComponentData from "./Utils/data-file";
import handleDownloadPdf from "./Utils/DownloadPdf";

import Button from "./Component/Button";
import Loader from "./Component/loader";
import Prompt from "./Component/prompt";
import Header from "./Component/header";
import SearchBar from "./Component/SearchBar";
import ItemContainer from "./Component/ItemContainer";
import TableContainer from "./Component/TableContainer";
import ResultTableContainer from "./Component/ResultTableContainer";

import useNotification from "./Hooks/use-notification";

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
  const [popUp, setPopUp] = useState(false);
  const ResultRef = useRef(null);

  const { NotificationComponent, TriggerNotification } =
    useNotification("top-right");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted && ResultRef.current) {
      ResultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isMounted, calculatedUnits]);

  const handleAddItem = (item) => {
    const updatedItems = [...items, item];
    TriggerNotification({
      message: `${item.totalDevices} ${item.name} of ${item.watts}W added Successfully.`,
      duration: 3500,
    });
    setItems(updatedItems);
    setInterval(() => {
      setPopUp(true);
    }, 2000);
    setPopUp(false);
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
    }, 2000);
  };

  const handleSliderTouchStart = () => {
    document.getElementsByClassName("items-container")[0].style.overflowX =
      "hidden";
  };

  const handleSliderTouchEnd = () => {
    document.getElementsByClassName("items-container")[0].style.overflowX =
      "auto";
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const filteredItems = ComponentData.filter((data) =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      {NotificationComponent}
      {prompt && (
        <Prompt
          onClosePrompt={() => setPrompt(false)}
          onDeleteAllItems={() => {
            handleDeleteAllData();
            setPrompt(false);
          }}
          totalItems={items.length}
        />
      )}

      {isLoading && <Loader />}

      <Header />
      <SearchBar searchQuery={searchQuery} onSearchQuery={handleSearchChange} />
      <ItemContainer
        items={filteredItems}
        onAddItem={handleAddItem}
        onSliderTouchStart={handleSliderTouchStart}
        onSliderTouchEnd={handleSliderTouchEnd}
      />
      <Button className=" clear-btn" onClick={() => setPrompt(true)}>
        Clear All
      </Button>
      <TableContainer items={items} onDeleteItem={handleDeleteItem} />

      {items.length >= 1 && (
        <Button className=" calc-btn" onClick={handleCalculateUnits}>
          Calculate Units
        </Button>
      )}

      {calculatedUnits !== null && (
        <ResultTableContainer
          items={items}
          calculatedUnits={calculatedUnits}
          ResultRef={ResultRef}
          onDownloadPdf={handleDownloadPdf}
        />
      )}
    </div>
  );
};

export default App;
