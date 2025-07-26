import Cliente from '../models/cliente.model.js';
import { ApiError } from '../utils/apiError.js';


export const createClient = async (req, res, next) => {
    const newClient = new Cliente(req.body);

    try {
        const savedClient = await newClient.save();
        console.log("Client created successfully:", savedClient);
        res.status(201).json({
            message: 'Client created successfully',
            client: savedClient
        });

    } catch (error) {
        next(error);
    };
};

export const getClients = async (req, res, next) => {
    try {
        const clients = await Cliente.find();
        console.log("Clients retrieved successfully:", clients);

        if (clients.length === 0){
            throw new ApiError(404, 'No clients found');
        }

        res.status(200).json({
            message: "Clients retrieved successfully",
            clients: clients
        });

    } catch (error) {
        next(error);
    };
};

export const getClientById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const client = await Cliente.findById(id);
        console.log(`Client with ID ${id} retrieved successfully:`, client);

        if (!client) {
            throw new ApiError(404, `Client with ID ${id} not found`);
        };

        res.status(200).json({
            message: `Client with ID ${id} retrieved successfully`,
            client: client
        });

    } catch (error) {
        next(error);
    };
};

export const updateClient = async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;
    
    try {
        const updatedClient = await Cliente.findByIdAndUpdate(id, updatedData, { new: true });
        console.log(`Client with ID ${id} updated successfully:`, updatedClient);

        if (!updatedClient) {
            throw new ApiError(404, `Client with ID ${id} not found`);
        };

        res.status(200).json({
            message: `Client with ID ${id} updated successfully`,
            client: updatedClient
        }); 

    } catch (error) {
        next(error);
    };
};

