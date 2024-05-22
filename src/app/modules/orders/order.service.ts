import { ProductModel } from '../product.model';
import { OrderModel } from './order.modal';

// Function to create an order and decrement product quantity
const createOrderIntoDB = async (orderData: any) => {
  try {
    // Create the order
    const order = await OrderModel.create(orderData);

    return order;
  } catch (error) {
    console.error('Error decrementing product quantity:', error);
    throw error;
  }
};

const getOrderIntoDB = async (email: string) => {
  try {
    const query = email ? { email } : {};
    const result = await OrderModel.find(query);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const OrderService = {
  createOrderIntoDB,
  getOrderIntoDB,
};
