import Joi from 'joi';

export const userSchema = Joi.object({
    nombre: Joi.string().pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/).required().messages({
      'string.pattern.base': 'El nombre solo puede contener letras y espacios.',
      'string.empty': 'El nombre es obligatorio.'
    }),

    email: Joi.string().email().required().messages({
        'string.email': 'El email debe ser válido',
        'any.required': 'El email es obligatorio'
    }),

    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().messages({
        'string.pattern.base': 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número.',
        'string.empty': 'La contraseña es obligatoria.'
    }),

    rol: Joi.string().valid('admin', 'cliente').default('cliente').messages({
        'any.only': 'El rol debe ser "admin" o "cliente".'
    })

});