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

    } catch (error) {
        console.error("Failed to retrieve products:", error);
        res.status(500).json(
            { message: 'Error retrieving products' }
        );
    };
};

export const getProductById = async (req, res) => {

    const { id } = req.params;

    try {
        const product = await Producto.findById(id);
        if(!product) {
            return res.status(404).json({
                message: 'Product not found, that ID does not exist'
            });
        };
        console.log("Product retrieved successfully:", product);
        res.status(200).json({
            message: "Product retrieved successfully",
            product: product
        });

    } catch (error) {
        console.error("Failed to retrieve product by ID:", error);
        res.status(500).json(
            { message: 'Error retrieving product by ID' }
        );
    };
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedProduct = await Producto.findOneAndUpdate(
            { _id: id },
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json(
                { message: 'Product not found, that ID does not exist' }
            );
        };

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });


    } catch (error) {
        console.error(`Failed to update product with ID ${id}:`, error);
        res.status(500).json(
            { message: 'Error updating product' }
        );
    };
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log(`Attempting to delete product with ID: ${id}`);

    try {
        const deletedProduct = await Producto.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
        );

        if (!deletedProduct) {
            return res.status(404).json(
                { message: 'Product not found, that ID does not exist' }
            );
        };

        res.status(200).json({
            message: 'Product deleted successfully',
            product: deletedProduct
        });

    } catch (error) {
        console.error(`Failed to delete product with ID ${id}:`, error);
        res.status(500).json({   
            message: 'Error deleting product',
            error: error.message 
        });
    };
};