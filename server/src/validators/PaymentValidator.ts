import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import NodeRSA from 'node-rsa';
import path from 'path';

import Validate from '../classes/Validate';
import User from '../models/User';
import { PaymentData } from '../utils/interfaces';

export async function PaymentValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { token } = req.body;

    if (!Validate.string(token)) return res.sendStatus(400);

    const privateKey = fs.readFileSync(
        path.resolve(__dirname, '../../keys/private.key')
    );

    const key = new NodeRSA(privateKey);

    try {
        const decrypted = key.decrypt(token, 'utf8');
        const json = JSON.parse(decrypted) as PaymentData;

        if (!Validate.number(json.amount) || !Validate.number(json.timestamp))
            return res.sendStatus(400);

        const user = res.locals.user as User;

        if (user.usedTokens.includes(token)) return res.sendStatus(400);

        const now = Math.floor(+new Date() / 1000);

        if (now - json.timestamp > 120) return res.sendStatus(400);

        res.locals.data = json;
        next();
    } catch (_) {
        res.sendStatus(400);
    }
}


export async function KPaymentValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { price } = req.body;
    if (!Validate.string(price))
        return res.sendStatus(400);
    next();
}


