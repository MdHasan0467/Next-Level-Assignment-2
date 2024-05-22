import { Schema, model } from 'mongoose';

// Define the Order interface
export interface Order {
    email: string;
    productId: string;
    price: number;
    quantity: number;
}

// Define the OrderSchema
const OrderSchema = new Schema<Order>({
    email: { type: String, required: true },
    productId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

// Export the Order model
export const OrderModel = model<Order>('Order', OrderSchema);
