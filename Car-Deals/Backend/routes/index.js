import express from 'express';
import authRouter from './authRouter';
import carRouter from './carRouter';
import dealershipRouter from './dealershipRouter';
import dealRouter from './dealRouter';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/cars', carRouter);
router.use('/dealerships', dealershipRouter);
router.use('/deals', dealRouter);

export default router;
