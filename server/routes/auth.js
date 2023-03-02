import express from 'express';
import { 
    login,
    register
} from '../controllers/auth.js';
const router = express.Router();

/* MUTATIONS */
router.post('/login', login);
router.post('/register', register);
router.post('/resetPassword', () => {});

export default router;