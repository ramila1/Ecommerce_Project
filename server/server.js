import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/database.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import productRouter from './routes/productRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import orderRouter from './routes/orderRoute.js';
import Stripe from 'stripe';

//dot env config
dotenv.config();

//database connection
connectDb();

//stripe configuration
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//cloudinary config
cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const app = express();

const port = process.env.PORT || 5000;

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//profile route
app.use('/api',userRouter);

//product route
app.use('/product',productRouter);

//category route
app.use('/category',categoryRouter);

//order route
app.use('/order',orderRouter);

app.get('/',(req,res)=>{
    res.statusCode = 200,
    res.setHeader('Content-Type','text/html'),
    res.send("<h1>Welcome</h1>")
});

app.listen(port,()=>{
    console.log(`server is running on PORT https://ecommerce:${port} on ${process.env.NODE_ENV} Mode`.bgCyan.white);
});