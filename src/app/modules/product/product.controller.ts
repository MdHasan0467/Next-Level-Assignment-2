import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { ProductModel } from '../product.model';

const createProduct = async (req: Request, res: Response) => {
  try {

    const product = req.body    
    const result = await ProductServices.createProductIntoDB(product);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await ProductServices.getProductIntoDB(searchTerm);

    return res.json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: result
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: err.message
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    console.log('productId', productId);
    const result = await ProductServices.getProductByIDIntoDB(productId);
    console.log(result);

    if (result) {
      return res.json({
        success: true,
        message: 'Product fetched successfully!',
        data: result
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const updatedProductData = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updatedProductData, { new: true });

    if (updatedProduct) {
      return res.json({
        success: true,
        message: 'Product updated successfully!',
        data: updatedProduct
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (deletedProduct) {
      return res.json({
        success: true,
        message: 'Product deleted successfully!',
        data: null
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};






export const ProductController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
    
  };