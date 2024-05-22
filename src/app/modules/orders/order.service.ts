import { ProductModel } from '../product.model';
import { OrderModel } from './order.modal';

// Function to create an order and decrement product quantity
const createOrderIntoDB = async (orderData: any) => {
  try {
    // Create the order
    const order = await OrderModel.create(orderData);

      // Find the product by ID
      const product = await ProductModel.findById({ _id: order.productId });

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

            
        } catch (error) {
            console.error('Error decrementing product quantity:', error);
            throw error;
        }


    };

export const OrderService = {
  createOrderIntoDB,
};
