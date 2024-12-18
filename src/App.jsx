import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import ComponentData from "./Utils/data-file";

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
  const [prompt, setPrompt] = useState(false);
  const ResultRef = useRef(null);

  const { NotificationComponent, TriggerNotification } = useNotification();

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  

  useEffect(() => {
    if (ResultRef.current) {
      ResultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ calculatedUnits]);

  const handleAddItem = (item) => {
    const updatedItems = [...items,item];
    const sortedItems = updatedItems.reduce((acc, curr) => {
      const existingItem = acc.find(i => i.id === curr.id);
      if (existingItem) {
        existingItem.totalDevices += curr.totalDevices;
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, []);
    
    TriggerNotification({
      message: `${item.totalDevices} ${item.name} of ${item.watts}W added Successfully.`,
      duration: 3500,
    });
    setItems(sortedItems);
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

  const handleCalculateUnits =  () => {
    let calculatedResult = 0;
    setIsLoading(true);
    setTimeout(() => {
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
        />
      )}
    </div>
  );
};

export default App;
