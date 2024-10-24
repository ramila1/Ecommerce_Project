import express from 'express';
import { isAuth } from '../middleswares/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.get('./get-all-order',isAuth,()=>{});

export default orderRouter;