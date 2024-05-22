import { ProductModel } from '../product.model';
import { OrderModel } from './order.modal';

// Function to create an order and decrement product quantity
const createOrderIntoDB = async (orderData: any) => {
  try {
    // Create the order
    const order = await OrderModel.create(orderData);

    // 
  } catch (error) {
    console.error('Error decrementing product quantity:', error);
    throw error;
  }
};

const getOrderIntoDB = async (email: string) => {

const query = email ? {email} : {};
const result = await OrderModel.find(query);
return result;

//   console.log('searchTerm', searchTerm);

//   const regex = new RegExp(searchTerm, 'i');
//   return await ProductModel.find({
//       $or: [
//           { email: { $regex: regex } }
//       ]
//   })
};

export const OrderService = {
  createOrderIntoDB,
  getOrderIntoDB,
};
