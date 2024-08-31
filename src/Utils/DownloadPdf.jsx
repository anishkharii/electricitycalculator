import jsPDF from "jspdf";
import "jspdf-autotable";

function handleDownloadPdf(items, calculatedUnits){
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
    doc.text("Device Details", 10, 60, { align: "left" });
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
      startY: 65,
    });

    // Create an array with table data
    const resultData = [
      ["Daily", `${Math.round(calculatedUnits * 100) / 100} kWh`],
      ["Weekly ", `${Math.round(calculatedUnits * 7 * 100) / 100} kWh`],
      ["15 Days ", `${Math.round(calculatedUnits * 15 * 100) / 100} kWh`],
      ["30 Days ", `${Math.round(calculatedUnits * 30 * 100) / 100} kWh`],
      ["180 Days ", `${Math.round(calculatedUnits * 180 * 100) / 100} kWh`],
      ["1 Year ", `${Math.round(calculatedUnits * 365 * 100) / 100} kWh`],
    ];

    // Add the result table to the PDF
    doc.text("Estimated Units", 10, doc.autoTable.previous.finalY + 10);

    const tableWidth = doc.internal.pageSize.getWidth() / 3;
    doc.autoTable({
      head: [["Time Span", "Estimated Units"]],
      body: resultData,
      startY: doc.autoTable.previous.finalY + 15,
      tableWidth: tableWidth,
    });

    // Add estimated electricity units

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
  export default handleDownloadPdf;