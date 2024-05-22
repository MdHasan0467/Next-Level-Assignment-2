import { Schema, model } from 'mongoose';
import { Product, Tinventory, Tvariant } from './product.interface';

// Define the VariantSchema
const VariantSchema = new Schema<Tvariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

// Define the InventorySchema
const InventorySchema = new Schema<Tinventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// Define the ProductSchema
const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    variants: {
      type: [VariantSchema], // Variants should be an array of VariantSchema
      required: true,
    },
    inventory: {
      type: InventorySchema, // Inventory is a subdocument
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

// Export the Product model
export const ProductModel = model<Product>('Product', productSchema);
