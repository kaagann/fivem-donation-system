import { NextFunction, Request, Response } from 'express';

import { serverCache } from '../cache';
import Validate, { validatePassword, validateUsername } from '../classes/Validate';
import User from '../models/User';
import messages from '../utils/messages';

export async function RegisterValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { username, password, email, steam_hex, discordId, serverId } =
        req.body;

    if (
        !validateUsername(username) ||
        !validatePassword(password) ||
        !Validate.email(email) ||
        !Validate.snowflake(discordId) ||
        !Validate.snowflake(serverId) ||
        !Validate.string(steam_hex, { min: 15, max: 18 })
    )
        return res.sendStatus(400);

    try {
        await serverCache.check(serverId);

        const user = await User.context.find({
            where: {
                serverId: { $eq: serverId },
                $or: [{ username }, { email }, { steam_hex }, { discordId }]
            }
        });

        if (user.length) {
            var error = '';

            if (username === user[0].username)
                error = messages.CONFLICT_USERNAME;
            else if (email === user[0].email) error = messages.CONFLICT_EMAIL;
            else if (discordId === user[0].discordId)
                error = messages.CONFLICT_DISCORD_ID;
            else if (steam_hex === user[0].steam_hex)
                error = messages.CONFLICT_STEAM_HEX;
            else error = messages.UNKNOWN_ERROR;

            return res.status(409).json({ error });
        } else return next();
    } catch (_) {
        return res.sendStatus(404);
    }
}

export async function LoginValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { username, password, serverId } = req.body;

    if (
        !validateUsername(username) ||
        !validatePassword(password) ||
        !Validate.snowflake(serverId)
    )
        return res.sendStatus(400);

    try {
        await serverCache.check(serverId);

        next();
    } catch (_) {
        res.sendStatus(404);
    }
}

export async function AuthValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const uid = req.session.user;
    if (!uid) return res.sendStatus(401);

    try {
        const user = await User.context.findOne(uid);
        res.locals.user = user;
        next();
    } catch (_) {
        res.sendStatus(401);
    }
}

export async function BotValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // const header = req.headers['authorization'];
    // if (!Validate.string(header) || header !== process.env.KEY)
    //     return res.sendStatus(400);
    next();
}

export async function AdminValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = res.locals.user as User;
        if (user.isAdmin) next();
        else res.sendStatus(403);
    } catch (_) {
        res.sendStatus(500);
    }
}