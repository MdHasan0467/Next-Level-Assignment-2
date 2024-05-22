import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { ProductModel } from '../product.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await OrderService.createOrderIntoDB(order);

    console.log('result', result);


    // Find the product by ID
    const product = await ProductModel.findById({ _id: order.productId });

    console.log('product',product);

    if(product?.inventory.quantity === 0){
      return res.status(404).json({
        success: false,
        message: 'Product is already stock out!',
        data: result,
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
    console.log(err);
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    console.log(email);
    const result = await OrderService.getOrderIntoDB(email as string);
    console.log('result', result);

    return res.json({
      success: true,
      message: `Order matching search term '${email}' fetched successfully!`,
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: err.message,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
