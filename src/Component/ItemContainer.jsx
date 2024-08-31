import ElectricComponent from "./ElectricComponent";

function ItemContainer({
  items,
  onAddItem,
  onSliderTouchStart,
  onSliderTouchEnd,
}) {
  return (
    <div className="items-container">
      {items.map((item, index) => (
        <ElectricComponent
          key={index}
          item={item}
          onAddItem={onAddItem}
          onTouchStart={onSliderTouchStart}
          onTouchEnd={onSliderTouchEnd}
        />
      ))}
      {items.length === 0 && <h4>No such Item found.</h4>}
    </div>
  );
}

export default ItemContainer;
