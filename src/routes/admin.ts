import {Router} from "express";
import * as auth from "../controllers/auth";

const router = Router();

router.get('/health', (req, res) => {
    res.json({status: 'UP'}).status(200);
});

router.post('/auth', auth.login);

export default router;