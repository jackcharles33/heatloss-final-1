import { jsPDF } from 'jspdf';

interface ReportData {
  prediction: number;
  errorMargin: number;
  breakdown?: {
    walls: number;
    windows: number;
    floor: number;
    roof: number;
  };
}

export function generatePDFReport(data: ReportData) {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text('Heat Loss Calculation Report', 20, 20);
  
  // Total Heat Loss
  doc.setFontSize(16);
  doc.text('Total Heat Loss:', 20, 40);
  doc.setFontSize(14);
  doc.text(`${data.prediction.toFixed(1)} kW`, 20, 50);
  
  // Error Range
  doc.setFontSize(16);
  doc.text('Error Range:', 20, 70);
  doc.setFontSize(14);
  doc.text(`${(data.prediction - data.errorMargin).toFixed(1)} kW - ${(data.prediction + data.errorMargin).toFixed(1)} kW`, 20, 80);
  
  // Breakdown if available
  if (data.breakdown) {
    doc.setFontSize(16);
    doc.text('Heat Loss Breakdown:', 20, 100);
    doc.setFontSize(14);
    doc.text(`Walls: ${data.breakdown.walls.toFixed(1)} kW`, 30, 110);
    doc.text(`Windows: ${data.breakdown.windows.toFixed(1)} kW`, 30, 120);
    doc.text(`Floor: ${data.breakdown.floor.toFixed(1)} kW`, 30, 130);
    doc.text(`Roof: ${data.breakdown.roof.toFixed(1)} kW`, 30, 140);
  }
  
  // Date
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 180);
  
  // Save the PDF
  doc.save('heat-loss-report.pdf');
}