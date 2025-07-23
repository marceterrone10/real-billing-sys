import Producto from '../models/producto.model.js';
import dotenv from 'dotenv';

dotenv.config();

export const createProduct = async (req, res) => {
    
    const newProducto = new Producto(req.body);

    try {
        const savedProduct = await newProducto.save();
        console.log("Product created successfully:", savedProduct);
        res.status(201).json({
            message: 'Product created successfully',
            product: savedProduct
        });
        
    } catch (error) {
        console.error("Failed to create product:", error);
        res.status(500).json(
            { message: 'Error creating product' }
        );
    };
};

export const getProducts = async (req, res) => {
    try {
        const products = await Producto.find();
        console.log("Products retrieved successfully:", products);
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        };

        res.status(200).json({
            message: "Products retrieved successfully",
            products: products
        });

        // Return the products in the response
        res.json(products);
    } catch (error) {
        console.error("Failed to retrieve products:", error);
        res.status(500).json(
            { message: 'Error retrieving products' }
        );
    };
};