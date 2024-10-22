import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import routeTest from './routes/routeTest.js'

//dot env config
dotenv.config();

const app = express();

const port = process.env.port || 5000;

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use('/api', routeTest);

app.get('/',(req,res)=>{
    res.statusCode = 200,
    res.setHeader('Content-Type','text/html'),
    res.send("<h1>Welcome</h1>")
});

app.listen(port,()=>{
    console.log(`server is run at https://ecommerce:${port}`.bgCyan.white);
});