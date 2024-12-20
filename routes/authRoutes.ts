import express from 'express';
import { authCheck, login, signup } from '../controller/auth.controller';
import { protectRoute } from '../middleware/protectedRoutes';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', login);

export default router;
