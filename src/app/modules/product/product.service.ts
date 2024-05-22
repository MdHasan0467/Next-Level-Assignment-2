import { ProductModel } from "../product.model";
import { Product } from "./product.interface";



const createProductIntoDB = async (product: Product) => {
    const result = await ProductModel.create(product);
    return result;
  };

const getProductIntoDB = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i');
  return await ProductModel.find({
      $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } }
      ]
  }).select('name description price category variants inventory');
};





  export const ProductServices = {
    createProductIntoDB,
    getProductIntoDB
  };