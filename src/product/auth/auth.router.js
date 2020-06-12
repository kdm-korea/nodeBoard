import express from 'express';
import authController from './auth.contorller';

const router = express.Router();

router.post('/auth', authController.createAccessToken);

module.exports = router;
