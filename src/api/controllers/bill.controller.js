import Factura from '../models/factura.model.js';
import Producto from '../models/producto.model.js';
import Cliente from '../models/cliente.model.js';

export const createBill = async (req, res) => {
    try {
        const { cliente, productos, estado } = req.body;
        
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
            estado: estado || 'PENDIENTE',
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
};

export const getBillById = async (req, res) => {
    const { id } = req.params;

    try {
        const bill = await Factura.findById(id)
        .populate('cliente', 'nombre email')
        .populate('productos.productoId', 'nombre precioUnitario');

        if (!bill) {
            return res.status(404).json({
                message: `Bill with ID ${id} not found`
            });
        };

        res.status(200).json({
            message: 'Bill fetched successfully',
            bill
        });

         
    } catch (error) {
        console.error("Error fetching bill:", error);
        res.status(500).json({
            message: 'Error fetching bill',
            error: error.message
        });
    }
};

export const getAllBills = async (req, res) => {
  try {
    const { clienteId, desde, hasta, minTotal, maxTotal } = req.query;

    const filters = {};

    if (clienteId) {
      filters.cliente = clienteId;
    }

    if (desde || hasta) {
      filters.fecha = {};
      if (desde) filters.fecha.$gte = new Date(desde);
      if (hasta) filters.fecha.$lte = new Date(hasta);
    }

    if (minTotal || maxTotal) {
      filters.total = {};
      if (minTotal) filters.total.$gte = Number(minTotal);
      if (maxTotal) filters.total.$lte = Number(maxTotal);
    }

    const bills = await Factura.find(filters)
      .populate('cliente', 'nombre email')
      .populate('productos.productoId', 'nombre precioUnitario');

    res.status(200).json(bills);

  } catch (error) {
    console.error('Error getting bills:', error);
    res.status(500).json(
        { message: 'Error fetching bills' }
    );
  }
};

export const updateBillStatus = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const bill = await Factura.findById(id);

        if (!bill) {
            return res.status(404).json({
                message: `Bill with ID ${id} not found`
            });
        }

        bill.estado = estado || bill.estado;
        await bill.save();

        res.status(200).json({
            message: 'Bill status updated successfully',
            bill
        });
        
    } catch (error) {
        console.error("Error updating bill status:", error);
        res.status(500).json({
            message: 'Error updating bill status',
            error: error.message
        });
    }
};
