import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generatePDF = (bill) => {
    const doc = new PDFDocument();

    const filePath = path.join('PDFs', `bill_${bill.id.toString()}.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text(`Bill ID: ${bill.id}`, { align: 'center' });
    doc.moveDown();

    doc.fontSize(16).text(`Customer Name: ${bill.cliente.razonSocial}`);
    doc.text(`Date: ${new Date(bill.fecha).toLocaleDateString()}`);
    doc.text(`State: ${bill.estado}`);
    doc.moveDown();

    doc.text('Products:');
    bill.productos.forEach(prod => {
        doc.text(`- ${prod.nombre} | Quantity: ${prod.cantidad} | Unit Price: $${prod.precioUnitario.toFixed(2)} | Subtotal: $${prod.subtotal}`);
    });

    doc.moveDown();
    doc.text(`Total: $${bill.total.toFixed(2)}`, { align: 'right' });
    doc.end();
};

