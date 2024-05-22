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
export const getAllProducts = async (req: Request, res: Response) => {
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



export const ProductController = {
    createProduct,
  };