import {RequestHandler} from "express";
import {z} from "zod";
import * as eventsService from "../services/events";
import * as uuid from "uuid";

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

export const getEvent: RequestHandler = async (req, res) => {
    const { uuid } = req.params;

    const item = await eventsService.getOne(uuid);

    if (item) {
        return res.json({
            event: item
        }).status(200);
    }

    res.json({
        event: []
    }).status(204);


};

export const addEvent: RequestHandler = async (req, res) => {
    const addEventSchema = z.object({
        title: z.string(),
        description: z.string(),
        grouped: z.boolean()
    })

    const body = addEventSchema.safeParse(req.body);

    if (! body.success) {
        return res.json({
            error: 'Dados inválidos'
        }).status(400);
    }

    req.body.uuid = uuid.v4();

    const newEvent = await eventsService.add(body.data);

    if (newEvent) {
        return res.json({
            event: newEvent
        }).status(201);
    }

    return res.json({
        error: 'Ocorreu um erro'
    }).status(500);

};