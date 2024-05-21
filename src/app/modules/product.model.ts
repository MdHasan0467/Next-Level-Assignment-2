import { Schema, model } from 'mongoose';
import { Product, Tinventory, Tvariant } from './product/product.interface';

const VariantSchema = new Schema<Tvariant>({
    type: { type: String,required:true},
    value:{type: String,required:true}
})

const InventorySchema = new Schema<Tinventory>({
    quantity : {type: Number,required:true},
    inStock: {type: Boolean,required:true}
})


const productSchema = new Schema<Product>({
    name: { 
        type: String, 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    tags: { 
        type: [String], 
        required: true 
    },
    variants: VariantSchema,
    inventory: InventorySchema
})


export const ProductModel = model<Product>('Product', productSchema);