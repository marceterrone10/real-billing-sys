import Producto from '../models/producto.model.js';
import dotenv from 'dotenv';
import { ApiError } from '../utils/apiError.js';


dotenv.config();

export const createProduct = async (req, res, next) => {
    
    const newProducto = new Producto(req.body);

    try {
        const savedProduct = await newProducto.save();
        console.log("Product created successfully:", savedProduct);
        res.status(201).json({
            message: 'Product created successfully',
            product: savedProduct
        });
        
    } catch (error) {
        next(error);
    };
};

export const getProducts = async (req, res, next) => {
    try {
        const products = await Producto.find();
        console.log("Products retrieved successfully:", products);
        if (products.length === 0) {
            throw new ApiError(404, 'No products found');
        }


        res.status(200).json({
            message: "Products retrieved successfully",
            products: products
        });

    } catch (error) {
        next(error);
    };
};

export const getProductById = async (req, res, next) => {

    const { id } = req.params;

    try {
        const product = await Producto.findById(id);
        if(!product) {
            throw new ApiError(404, 'Product not found, that ID does not exist');
        };
        console.log("Product retrieved successfully:", product);
        res.status(200).json({
            message: "Product retrieved successfully",
            product: product
        });

    } catch (error) {
        next(error);
    };
};

export const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedProduct = await Producto.findOneAndUpdate(
            { _id: id },
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            throw new ApiError(404, 'Product not found, that ID does not exist');
        }

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        next(error);
    };
};

export const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Attempting to delete product with ID: ${id}`);

    try {
        const deletedProduct = await Producto.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
        );

        if (!deletedProduct) {
            throw new ApiError(404, 'Product not found, that ID does not exist');
        }

        res.status(200).json({
            message: 'Product deleted successfully',
            product: deletedProduct
        });

    } catch (error) {
        next(error);
    };
};