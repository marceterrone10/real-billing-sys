import Joi from 'joi';

export const clientSchema = Joi.object({
    razonSocial: Joi.string().min(3).required().messages({
        'string.empty': 'La razón social es obligatoria',
        'string.min': 'La razón social debe tener al menos 3 caracteres',
        'any.required': 'La razón social es obligatoria'
    }),

    cuit: Joi.string().pattern(/^\d{11}$/).required().messages({
        'string.pattern.base': 'El CUIT debe tener 11 dígitos',
        'any.required': 'El CUIT es obligatorio'
    }),

    direccion: Joi.string().min(5).max(200).required().messages({
        'string.empty': 'La dirección es obligatoria',
        'string.min': 'La dirección debe tener al menos 5 caracteres'
    }),

    telefono: Joi.string().pattern(/^\d{10,15}$/).required().messages({
        'string.pattern.base': 'El teléfono debe tener entre 10 y 15 dígitos numéricos',
        'any.required': 'El teléfono es obligatorio',
    }),

    email: Joi.string().email().required().messages({
        'string.email': 'El email debe ser válido',
        'any.required': 'El email es obligatorio',
     }),

    activo: Joi.boolean().default(true),    

});