import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

//dot env config
dotenv.config();

const app = express();

const port = process.env.port || 5000;

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.send("<h1>Welcome to The Server</h1>");
});

app.listen(port,()=>{
    console.log(`server is run at https://ecommerce:${port}`.bgCyan.white);
});