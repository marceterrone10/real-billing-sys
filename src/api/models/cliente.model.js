import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  razonSocial: {
    type: String,
    required: true,
    minLength: 3,
    trim: true
  },
  cuit: {
    type: String,
    required: true,
    unique: true
  },
  direccion: {
    type: String,
    required: true
  },
  telefono: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  activo: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('Cliente', clienteSchema);
