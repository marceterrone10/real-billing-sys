export const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const detalles = error.details.map((e) => e.message);
            return res.status(400).json({
                message: 'Invalid request data',
                errores: detalles
            });
        }

        next();
    }
};
