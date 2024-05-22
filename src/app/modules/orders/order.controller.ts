import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { ProductModel } from '../product.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await OrderService.createOrderIntoDB(order);

    // Find the product by ID
    const product = await ProductModel.findById({ _id: order.productId });


    if(product?.inventory.quantity === 0){
      return res.status(404).json({
        success: false,
        message: 'Product is already stock out!',
      });
    }



    // Update the product quantity
    if (product) {
      product.inventory.quantity -= order.quantity;
      if (product.inventory.quantity <= 0) {
        product.inventory.quantity = 0;
        product.inventory.inStock = false;
      }
      await product.save();
    } else {
      throw new Error('Product not found');
    }



   return res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success:false,
      message: "Not not created"
    })
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    const result = await OrderService.getOrderIntoDB(email as string);

    if(result?.length !== 0){
      return res.status(200).json({
        success: true,
        message: `Order matching search term '${email}' fetched successfully!`,
        data: result,
      });
    }else{
      return res.status(404).json({
        success: false,
        message: "invalid email address! please try with a valid email address",
      });
    }

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
