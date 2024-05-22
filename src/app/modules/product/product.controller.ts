import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { ProductModel } from '../product.model';

const createProduct = async (req: Request, res: Response) => {
  try {

    const product = req.body    
    // const { product: productData } = req.body;
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


// Controller to get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
      const products = await ProductModel.find();
      res.status(200).json({
          success: true,
          message: "Products fetched successfully!",
          data: products
      });
  } catch (err:any) {
      res.status(500).json({
          success: false,
          message: "Failed to fetch products",
          error: err.message
      });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    // Query the database to find the product by its ID
    const product = await ProductModel.findById(productId);

    // If the product is found, return success response with product data
    if (product) {
      return res.json({
        success: true,
        message: 'Product fetched successfully!',
        data: product
      });
    } else {
      // If product is not found, return appropriate error response
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
  } catch (error) {
    // Handle any unexpected errors
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
    getProductById
  };