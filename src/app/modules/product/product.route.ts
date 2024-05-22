import express from 'express';
import { ProductController } from './product.controller';


const router = express.Router();

router.post('/create-product', ProductController.createProduct);
router.get('/products', ProductController.getAllProducts);
// Define route for retrieving a specific product by ID
router.get('/:productId', ProductController.getProductById);



export const ProductRoutes = router;