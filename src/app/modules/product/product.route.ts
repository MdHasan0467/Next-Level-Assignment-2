import express from 'express';
import { ProductController } from './product.controller';


const router = express.Router();

router.post('/api/products', ProductController.createProduct);