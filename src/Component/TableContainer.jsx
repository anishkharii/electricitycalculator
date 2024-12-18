import { X } from "lucide-react";

function TableContainer({ items, onDeleteItem }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>No. of Devices</th>
            <th>Watts</th>
            <th>Usage/Day</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{`${index + 1}.`}</td>
              <td style={{ fontWeight: "bold" }}>{item.name}</td>
              <td>{item.totalDevices}</td>
              <td>{`${item.watts}W`}</td>
              <td>{`${item.usagePerDay} Hrs.`}</td>
              <td className="delete-icon">
                <X onClick={() => onDeleteItem(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableContainer;
