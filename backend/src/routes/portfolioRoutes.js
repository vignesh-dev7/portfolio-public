import express from 'express';
import { getPortfolio, createPortfolio } from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/', getPortfolio);
router.post('/', createPortfolio); // use once to insert initial data

export default router;
