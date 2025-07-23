import Cliente from '../models/cliente.model.js';

export const createClient = async (req, res) => {
    const newClient = new Cliente(req.body);

    try {
        const savedClient = await newClient.save();
        console.log("Client created successfully:", savedClient);
        res.status(201).json({
            message: 'Client created successfully',
            client: savedClient
        });

    } catch (error) {
        console.error("Failed to create client:", error);
        res.status(500).json({
             message: 'Error creating client' 
        });
    };
};