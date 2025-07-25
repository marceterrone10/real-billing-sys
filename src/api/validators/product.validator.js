import Joi from 'joi';

export const productSchema = Joi.object({
    nombre: Joi.string().min(3).required().messages({
        'string.empty': 'El nombre del producto es obligatorio',
        'string.min': 'El nombre del producto debe tener al menos 3 caracteres',
        'any.required': 'El nombre del producto es obligatorio'
    }),

    descripcion: Joi.string().max(500).optional().messages({
        'string.max': 'La descripción del producto no puede exceder los 500 caracteres'
    }),

    precioUnitario: Joi.number().min(0).required().messages({
        'number.min': 'El precio unitario debe ser un número positivo',
        'any.required': 'El precio unitario es obligatorio'
    }),

    stock: Joi.number().min(0).required().messages({
        'number.base': 'El stock debe ser un número',
        'number.min': 'El stock no puede ser negativo',
        'any.required': 'El stock es obligatorio'
    }),

    activo: Joi.boolean().default(true).messages({
        'boolean.base': 'El estado activo debe ser un valor booleano'
    }),

    creadoEn: Joi.date().default(() => new Date(), 'fecha actual').messages({
        'date.base': 'La fecha de creación debe ser una fecha válida'
    })

});