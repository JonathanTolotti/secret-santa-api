import {RequestHandler} from "express";
import {z} from "zod";
import * as authService from "../services/auth"

export const login: RequestHandler = (req, res) => {
    // Validação de dados
    const loginSchema = z.object({
        password: z.string()
    });

    const body = loginSchema.safeParse(req.body);

    if (! body.success) {
        return res.json({
            error: 'Dados inválidos'
        }).status(403);
    }

    if (! authService.validatePassword(body.data.password)) {
        return res.json({
            error: 'Acesso inválido, verifique a senha enviada'
        }).status(403);

    }

    return res.json({
        token: authService.createToken()
    }).status(200);
};

export const validate: RequestHandler = (req, res, next) => {
    if (! req.headers.authorization) {
        return res.json({
            error: 'Token de autenticação não enviado'
        }).status(403);
    }

    const token = req.headers.authorization.split(' ')[1];

    if (! authService.validateToken(token)) {
        return res.json({
            error: 'Acesso negado'
        }).status(403);
    }

    next();
};