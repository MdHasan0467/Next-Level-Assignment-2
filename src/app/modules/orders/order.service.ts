import { OrderModel } from './order.modal';

// Function to create an order and decrement product quantity
const createOrderIntoDB = async (orderData: string) => {
  
    // Create the order
    const order = await OrderModel.create(orderData);
    return order;
};

const getOrderIntoDB = async (email: string) => {
  const query = email ? { email } : {};
  const result = await OrderModel.find(query);
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getOrderIntoDB,
};
