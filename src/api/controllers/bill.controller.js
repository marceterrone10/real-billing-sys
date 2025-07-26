import Factura from '../models/factura.model.js';
import Producto from '../models/producto.model.js';
import Cliente from '../models/cliente.model.js';
import { generatePDF } from '../utils/pdfGenerator.utils.js';
import { ApiError } from '../utils/apiError.js'


export const createBill = async (req, res, next) => {
    try {
        const { cliente, productos, estado } = req.body;
        
        if (!cliente || !productos || productos.length === 0 || !Array.isArray(productos)) {
            throw new ApiError(400, "Invalid request data. 'cliente' and 'productos' are required.");
        };
        
        const clientExist = await Cliente.findById(cliente);
        if (!clientExist) {
            throw new ApiError(404, `Client with ID ${cliente} not found`);
        };
        
        let total = 0;
        const productsDetails = [];

        for (const item of productos) {
            const product = await Producto.findById(item.productoId);

            if (!product) {
                throw new ApiError(404, `Product with ID ${item.productoId} not found`);
            };

            const cantidad = Number(item.cantidad);
            
            if( isNaN(cantidad) || cantidad <= 0) {
                throw new ApiError(400, `Invalid quantity for product ${product.nombre}`);
            }

            console.log("DEBUG:");
            console.log("product.stock:", product.stock, typeof product.stock);
            console.log("item.cantidad:", item.cantidad, typeof item.cantidad);


            if (product.stock < item.cantidad) {
                throw new ApiError(400, `Insufficient stock for product ${product.nombre}`);
            }

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

        const savedBillWithDetails = await Factura.findById(savedBill._id)
            .populate('cliente')
            .populate('productos.productoId');

        generatePDF(savedBillWithDetails);


        res.status(201).json({
            message: 'Bill created successfully',
            bill: savedBill
        });

    } catch (error) {
        next(error);
    }
};

export const getBillById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const bill = await Factura.findById(id)
        .populate('cliente', 'razonSocial email')
        .populate('productos.productoId', 'nombre precioUnitario');

        if (!bill) {
            throw new ApiError(404, `Bill with ID ${id} not found`);
        };

        res.status(200).json({
            message: 'Bill fetched successfully',
            bill
        });

         
    } catch (error) {
        next(error);
    }
};

export const getAllBills = async (req, res, next) => {
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
      .populate('cliente', 'razonSocial email')
      .populate('productos.productoId', 'nombre precioUnitario');

    res.status(200).json(bills);

  } catch (error) {
    next(error);
  }
};

export const updateBillStatus = async (req, res, next) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const bill = await Factura.findById(id);

        if (!bill) {
            throw new ApiError(404, `Bill with ID ${id} not found`);
        }

        bill.estado = estado || bill.estado;
        await bill.save();

        res.status(200).json({
            message: 'Bill status updated successfully',
            bill
        });
        
    } catch (error) {
        next(error);
    }
};
