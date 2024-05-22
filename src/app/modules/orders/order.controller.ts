import { Request, Response } from 'express';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {

    const order = req.body    
    const result = await OrderService.createOrderIntoDB(order)

    console.log('result', result);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};


export const OrderController = {
    createOrder,
  };