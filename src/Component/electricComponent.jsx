import { React, useEffect, useRef, useState } from "react";
import './component.css';
function ElectricComponent({item, onAddItem, onTouchStart, onTouchEnd}){
  const [watts, setWatts] = useState(item.minWatts);
  const [usagePerDay, setUsagePerDay] = useState(1);
  const [totalDevices, setTotalDevices] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    if(showPopup) {
      setTimeout(() => {
        setShowPopup(false);
      }, 2500);
    }
  })
  const addButtonRef = useRef(null);

  const handleWattsChange = (event) => {
    const newValue = Number(event.target.value);
    if (isNaN(newValue)) {
      setWatts(item.minWatts);
      return;
    }
    if (newValue < item.minWatts) {
      setWatts(item.minWatts);
    } else if (newValue > item.maxWatts) {
      setWatts(item.maxWatts);
    } else {
      setWatts(newValue);
    }
  };

  const handleUsagePerDayChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (isNaN(newValue)) {
      setUsagePerDay(1);
      return;
    }

    if (newValue <0) {
      setUsagePerDay(1);
    } else if (newValue > 24) {
      setUsagePerDay(24);
    } else {
      setUsagePerDay(newValue);
    }
  };

  const handleTotalDevicesChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (isNaN(newValue)) {
      setTotalDevices(1);
      return;
    }
    if (newValue < 1) {
      setTotalDevices(1);
    } else {
      setTotalDevices(newValue);
    }
  };

  const handleAddButtonClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(40);
    }


    const newObject = {
      name: item.name,
      totalDevices: totalDevices,
      watts: watts,
      usagePerDay: usagePerDay,
    };
    
    
    onAddItem(newObject);
  };
  return (
    <>
    <div className="component-container min-w-52 flex flex-col justify-start mx-5 my-5 rounded-md ">
      <div className="  title-container text-xl font-bold bg-slate-300  ">
        {item.name}
      </div>

      <div className="details-container">
        <div className="slider-container flex flex-col items-center justify-center ">
          <label htmlFor="watts-slider">No. of Devices:</label>
          <input
            type="range"
            id="nums-slider"
            min={1}
            max={25}
            step={1}
            value={totalDevices || 1}
            onChange={handleTotalDevicesChange}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />
          <input
            type="number"
            className="  w-1/3 border rounded-sm "
            value={totalDevices}
            onBlur={handleTotalDevicesChange}
            onChange={(e) => setTotalDevices(e.target.value)}
          />
        </div>
        <div className="slider-container flex flex-col items-center justify-center ">
          <label htmlFor="watts-slider">Wattage (W):</label>
          <input
            type="range"
            id="watts-slider"
            min={item.minWatts}
            max={item.maxWatts}
            step={item.step}
            value={watts}
            onChange={handleWattsChange}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />
          <input
            type="number"
            className=" w-1/3 border rounded-sm "
            value={watts}
            onBlur={handleWattsChange}
            onChange={(e) => setWatts(e.target.value)}
          />
        </div>
        <div className="slider-container flex flex-col items-center justify-center ">
          <label htmlFor="usage-per-day-slider">Usage per Day(in Hrs.):</label>
          <input
            type="range"
            id="usage-per-day-slider"
            min={1}
            max={24}
            value={usagePerDay || 1}
            onChange={handleUsagePerDayChange}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />
          <input
            type="number" className=" w-1/3 border rounded-sm "
            value={usagePerDay}
            onChange={(e) => setUsagePerDay(e.target.value)}
            onBlur={handleUsagePerDayChange}
          />
        </div>
        <button ref={addButtonRef} className='add-btn mx-3 my-3 bg-cyan-700 text-white px-7 py-2 rounded-md' onClick={handleAddButtonClick}>ADD</button>
      </div>
    </div>
    </>
  );
};
export default ElectricComponent;
