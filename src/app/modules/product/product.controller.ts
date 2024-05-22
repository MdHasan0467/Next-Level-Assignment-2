import { Request, Response } from 'express';
import { ProductServices } from './product.service';

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
    res.status(500).json({
      success:true,
      message:"Not create product"
    })
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
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    
    const result = await ProductServices.getProductByIDIntoDB(productId);

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

    const result = await ProductServices.updatedProductByIDIntoDb(productId, updatedProductData);

    if (result) {
      return res.json({
        success: true,
        message: 'Product updated successfully!',
        data: result
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
  } catch (error) {
      return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const result = await ProductServices.deleteProductByIdIntoDB(productId);

    if (result) {
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