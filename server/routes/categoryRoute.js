import express from 'express';
import { createCategoryController, getAllCategoryController ,getOneCategoryController} from '../controllers/categoryController.js';
import { isAuth } from '../middleswares/authMiddleware.js';

const categoryRouter = express.Router();

categoryRouter.get('/get-all-category',getAllCategoryController);

categoryRouter.get('/get-one-category/:id',isAuth,getOneCategoryController);

categoryRouter.post('/create-category',isAuth,createCategoryController);

categoryRouter.delete('/delete-category',isAuth,()=>{});

export default categoryRouter;
