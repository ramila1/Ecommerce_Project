import express from 'express';
import { controllerTest } from '../controllers/controllerTest.js';

const router = express.Router();

router.get('/test',controllerTest);

export default router;