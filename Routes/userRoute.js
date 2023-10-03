import express from 'express';
import { authanticate } from '../Middleware/index.js';
import { userProfile } from '../controllers/user.js';
const router = express.Router();

router.get("/profile", authanticate, userProfile)

export default router;