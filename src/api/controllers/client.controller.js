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

export const getClients = async (req, res) => {
    try {
        const clients = await Cliente.find();
        console.log("Clients retrieved successfully:", clients);

        if (clients.length === 0){
            return res.status(404).json({ 
                message: 'No clients found' 
            });
        }

        res.status(200).json({
            message: "Clients retrieved successfully",
            clients: clients
        });

    } catch (error) {
        console.error("Failed to retrieve clients:", error);
        res.status(500).json({
            message: 'Error retrieving clients'
        });
    };
};

export const getClientById = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await Cliente.findById(id);
        console.log(`Client with ID ${id} retrieved successfully:`, client);

        if (!client) {
            return res.status(404).json({
                message: `Client with ID ${id} not found`
            });
        };

        res.status(200).json({
            message: `Client with ID ${id} retrieved successfully`,
            client: client
        });

    } catch (error) {
        console.error(`Error retrieving client with ID ${id}:`, error);
        res.status(500).json({
            message: `Error retrieving client with ID ${id}`,
            error: error.message
        });
    };
};

export const updateClient = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    
    try {
        const updatedClient = await Cliente.findByIdAndUpdate(id, updatedData, { new: true });
        console.log(`Client with ID ${id} updated successfully:`, updatedClient);

        if (!updatedClient) {
            return res.status(404).json({
                message: `Client with ID ${id} not found`
            });
        };

        res.status(200).json({
            message: `Client with ID ${id} updated successfully`,
            client: updatedClient
        }); 

    } catch (error) {
        console.error(`Error updating client with ID ${id}:`, error);
        res.status(500).json({
            message: `Error updating client with ID ${id}`,
            error: error.message
        });
    };
};

