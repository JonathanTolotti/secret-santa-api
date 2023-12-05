import {RequestHandler} from "express";
import * as eventsService from "../services/events";

export const getAll: RequestHandler = async (req, res) => {
    const items = await eventsService.getAll();

    if (items) {
        return res.json({
            events: items
        }).status(200);
    }

    res.json({
        error: 'Ocorreu um erro, tente novamente.'
    }).status(500);
};