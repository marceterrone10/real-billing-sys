import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
    estado: {
        type: String,
        enum: ['PENDIENTE', 'PAGADA', 'ANULADA'],
        default: 'PENDIENTE',
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    productos: [
        {
            productoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Producto',
                required: true
            },
            nombre: String,
            cantidad: {
                type: Number,
                required: true,
                min: 1
            },
            precioUnitario: {
                type: Number,
                required: true,
                min: 0
            },
            subtotal: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    total: {
        type: Number,
        required: true,
        min: 0
    }
});

export default mongoose.model('Factura', facturaSchema);
