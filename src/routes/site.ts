import {Router} from "express";

const router = Router();

router.get('/health', (req, res) => {
    res.json({status: 'UP'}).status(200);
});

export default router;