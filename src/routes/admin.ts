import {Router} from "express";
import * as auth from "../controllers/auth";
import * as events from "../controllers/events";

const router = Router();

router.get('/health', auth.validate, (req, res) => {
    res.json({status: 'UP', admin: true}).status(200);
});

router.post('/auth', auth.login);

router.get('/events', auth.validate, events.getAll);
router.get('/events/:uuid', auth.validate, events.getEvent);

export default router;