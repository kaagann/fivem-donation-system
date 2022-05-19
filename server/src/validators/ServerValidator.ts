import { NextFunction, Request, Response } from 'express';

import { serverCache } from '../cache';
import Validate, { validateUsername } from '../classes/Validate';
import User from '../models/User';

export async function ServerValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { serverId } = req.body;

    if (!Validate.snowflake(serverId)) return res.sendStatus(400);

    try {
        await serverCache.check(serverId);

        next();
    } catch (_) {
        res.sendStatus(404);
    }
}

export async function CreateServerValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { name, photo, ip, webhook } = req.body;

    if (
        !Validate.string(name, { max: 32 }) ||
        !Validate.url(photo) ||
        !Validate.string(ip) ||
        !Validate.url(webhook)
    )
        return res.sendStatus(400);

    next();
}

export async function ChangeUserPermValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { serverId, username } = req.body;

    if (!Validate.snowflake(serverId) || !validateUsername(username))
        return res.sendStatus(400);

    try {
        const user = await User.context.findOne({ username, serverId });
        res.locals.user = user;
        next();
    } catch (_) {
        res.sendStatus(404);
    }
}
