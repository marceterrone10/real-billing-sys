import Factura from '../models/factura.model.js';
import Producto from '../models/producto.model.js';
import Cliente from '../models/cliente.model.js';

export const createBill = async (req, res) => {
    try {
        const { cliente, productos } = req.body;
        
        if (!cliente || !productos || productos.length === 0, !Array.isArray(productos)) {
            return res.status(400).json({
                message: "Invalid request data. 'cliente' and 'productos' are required."
            });
        };
        
        const clientExist = await Cliente.findById(cliente);
        if (!clientExist) {
            return res.status(404).json({
                message: `Client with ID ${cliente} not found`
            });
        };
        
        let total = 0;
        const productsDetails = [];

        for (const item of productos) {
            const product = await Producto.findById(item.productoId);

            if (!product) {
                return res.status(404).json({
                    message: `Product with ID ${item.productoId} not found`
                });
            };

            if (product.stock < item.cantidad) {
                return res.status(400).json({
                    message: `Insufficient stock for product ${product.nombre}`
                });
            };

            product.stock -= item.cantidad;
            await product.save();

            const subtotal = product.precioUnitario * item.cantidad;
            total += subtotal;

            productsDetails.push({
                productoId: product._id,
                nombre: product.nombre,
                cantidad: item.cantidad,
                precioUnitario: product.precioUnitario,
                subtotal
            });
        }

        const newBill = new Factura({
            fecha: new Date(),
            cliente,
            productos: productsDetails,
            total
        });

        const savedBill = await newBill.save();

        res.status(201).json({
            message: 'Bill created successfully',
            bill: savedBill
        });

    } catch (error) {
        console.error("Error creating bill:", error);
        res.status(500).json({ 
            message: 'Error creating bill',
            error: error.message
        });
    }
}

