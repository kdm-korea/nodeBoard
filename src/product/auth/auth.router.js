import express from 'express';
import jwtAuth from '../../middleware/auth/jwt.auth';
import authController from './auth.contorller';

const router = express.Router();

router.post('/auth', authController.createAccessToken);

module.exports = router;
