import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoute } from './app/modules/orders/order.route';

const app: Application = express();

//* parsers...
app.use(express.json());
app.use(cors());



//* routes...
app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoute)



// 404 Error Handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        succes: false,
        message: "Route not found"
       });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});



app.get('/', (req: Request, res: Response) => {
res.send('Server is running');
});
export default app;
