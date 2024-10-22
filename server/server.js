import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import routeTest from './routes/routeTest.js'
import connectDb from './config/database.js';
import userRouter from './routes/userRoute.js';

//dot env config
dotenv.config();

//database connection
connectDb();

const app = express();

const port = process.env.PORT || 5000;

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use('/api', routeTest);
app.use('/api',userRouter);

app.get('/',(req,res)=>{
    res.statusCode = 200,
    res.setHeader('Content-Type','text/html'),
    res.send("<h1>Welcome</h1>")
});

app.listen(port,()=>{
    console.log(`server is run at https://ecommerce:${port}`.bgCyan.white);
});