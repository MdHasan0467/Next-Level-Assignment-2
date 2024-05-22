import express from 'express';
import { getAllProducts, ProductController } from './product.controller';


const router = express.Router();

router.post('/create-product', ProductController.createProduct);
router.get('/products', getAllProducts);




export const ProductRoutes = router;