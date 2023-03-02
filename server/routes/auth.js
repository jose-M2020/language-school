import express from 'express';
import { 
    login,
    register
} from '../controllers/auth.js';
import { roleAuthorization, verifyToken } from '../middlewares/auth.js';
const router = express.Router();

/* MUTATIONS */
router.post('/login', login);
router.post('/register',
  verifyToken, 
  roleAuthorization(['admin']),
  register
);
router.post('/resetPassword', () => {});

export default router;