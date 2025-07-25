import Joi from 'joi';
import mongoose from 'mongoose';

export const billSchema = Joi.object({
  estado: Joi.string()
    .valid('PENDIENTE', 'PAGADA', 'ANULADA')
    .default('PENDIENTE')
    .messages({
      'any.only': 'El estado debe ser PENDIENTE, PAGADA o ANULADA'
    }),

  fecha: Joi.date()
    .default(Date.now)
    .messages({
      'date.base': 'La fecha debe ser una fecha válida'
    }),

  cliente: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'Validación de ObjectId')
    .messages({
      'any.required': 'El cliente es obligatorio',
      'any.invalid': 'El ID del cliente no es válido'
    }),

  productos: Joi.array()
    .items(
      Joi.object({
        productoId: Joi.string()
          .required()
          .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              return helpers.error('any.invalid');
            }
            return value;
          })
          .messages({
            'any.required': 'El ID del producto es obligatorio',
            'any.invalid': 'El ID del producto no es válido'
          }),

        nombre: Joi.string().optional(),

        cantidad: Joi.number()
          .integer()
          .min(1)
          .required()
          .messages({
            'number.base': 'La cantidad debe ser un número',
            'number.min': 'La cantidad mínima es 1',
            'any.required': 'La cantidad es obligatoria'
          }),

        precioUnitario: Joi.number()
          .min(0)
          .required()
          .messages({
            'number.base': 'El precio unitario debe ser un número',
            'number.min': 'El precio no puede ser negativo',
            'any.required': 'El precio unitario es obligatorio'
          })

      })
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Debe enviar un array de productos',
      'array.min': 'Debe incluir al menos un producto',
      'any.required': 'El array de productos es obligatorio'
    })
});
