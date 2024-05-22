import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { ProductModel } from '../product/product.model';
import { TOrderSchema } from './orders.validaition';

// Post a single order
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const zodParseData = TOrderSchema.parse(order);

    // Find the product by ID
    const product = await ProductModel.findById(zodParseData.productId);

    //Product is already stock out!
    if (product?.inventory.quantity === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product is already stock out!',
      });
    }

    // Update the product quantity
    if (product) {
      // Is product quantity available
      if (product.inventory.quantity > order.quantity) {
        product.inventory.quantity -= order.quantity;
      } else {
        return res.status(404).json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        });
      }

      // If product quantity is 0 then set it to 0 and set inStock to false
      if (product.inventory.quantity <= 0) {
        product.inventory.quantity = 0;
        product.inventory.inStock = false;
      }
      await product.save();
    } else {
      throw new Error('Product not found!');
    }

    const result = await OrderService.createOrderIntoDB(order);

    // Order created successfully!
    return res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      now_available_quantity: product.inventory.quantity,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Order not created!',
    });
  }
};

// Get all orders And Get Order by dynamic email
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    const result = await OrderService.getOrderIntoDB(email as string);

    if (result?.length !== 0) {
      return res.status(200).json({
        success: true,
        message: `Order matching search term '${email}' fetched successfully!`,
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
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
