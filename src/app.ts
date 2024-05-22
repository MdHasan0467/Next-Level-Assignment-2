import express, { Application, Request, Response } from 'express';
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




app.get('/', (req: Request, res: Response) => {
res.send('Server is running');
});
export default app;
