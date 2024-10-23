import express from 'express';
import { createCategoryController, getAllCategoryController } from '../controllers/categoryController.js';
import { isAuth } from '../middleswares/authMiddleware.js';

const categoryRouter = express.Router();

categoryRouter.get('/get-all-category',getAllCategoryController);

categoryRouter.post('/create-category',isAuth,createCategoryController);



export default categoryRouter;
