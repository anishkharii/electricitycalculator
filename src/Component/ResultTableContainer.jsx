import { ArrowDownToLine } from "lucide-react";
import handleDownloadPdf from "../Utils/DownloadPdf";

function ResultTableContainer({items, calculatedUnits, ResultRef }) {
  return (
    <div
      ref={ResultRef}
      className=" flex flex-col items-center justify-center gap-8 my-6"
    >
      <table className=" w-auto ">
        <caption className="text-xl font-bold py-5">Electricity Units</caption>
        <thead>
          <tr>
            <th className=" font-bold px-5 bg-cyan-700 text-white">
              Time Span
            </th>
            <th className=" font-bold px-5 bg-cyan-700 text-white">Units</th>
          </tr>
        </thead>
        <tbody className=" bg-slate-100">
          <tr className=" border border-x-2 px-5">
            <td className="font-bold">Daily</td>
            <td>{Math.round(calculatedUnits * 100) / 100} kWh</td>
          </tr>
          <tr className=" border border-x-2 px-5">
            <td className="font-bold">Weekly</td>
            <td>{Math.round(calculatedUnits * 7 * 100) / 100} kWh</td>
          </tr>
          <tr className=" border border-x-2 px-5">
            <td className="font-bold">15 Days</td>
            <td>{Math.round(calculatedUnits * 15 * 100) / 100} kWh</td>
          </tr>
          <tr className=" border border-x-2 px-5">
            <td className="font-bold">30 Days</td>
            <td>{Math.round(calculatedUnits * 30 * 100) / 100} kWh</td>
          </tr>
          <tr className=" border border-x-2 px-5">
            <td className="font-bold">180 Days</td>
            <td>{Math.round(calculatedUnits * 180 * 100) / 100} kWh</td>
          </tr>
          <tr className=" border border-x-2 px-5">
            <td className="font-bold">1 Year</td>
            <td>{Math.round(calculatedUnits * 365 * 100) / 100} kWh</td>
          </tr>
        </tbody>
      </table>
      <button className="button download-btn" onClick={()=>handleDownloadPdf(items, calculatedUnits)}>
        Download <ArrowDownToLine size={20} />
      </button>
    </div>
  );
}

export default ResultTableContainer;
