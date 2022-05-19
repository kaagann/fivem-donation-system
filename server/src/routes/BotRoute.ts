import { Router } from 'express';

import { serverCache } from '../cache';
import Server from '../models/Server';
import User from '../models/User';
import { getSnowflake } from '../utils/functions';
import {
    ChangeUserPermValidator,
    CreateServerValidator,
    ServerValidator
} from '../validators/ServerValidator';

const router = Router();

router.post('/server', CreateServerValidator, async (req, res) => {
    const { name, photo, ip, webhook } = req.body;

    const server = new Server({
        id: getSnowflake(),
        name,
        photo,
        ip,
        paymentWebhook: webhook
    });

    try {
        await Server.context.save(server);
        res.status(200).json(server);
    } catch (_) {
        res.sendStatus(500);
    }
});

router.delete('/server', ServerValidator, async (req, res) => {
    const { serverId } = req.body;

    serverCache.remove(serverId);

    try {
        await Server.context.delete({ id: serverId });
        await User.context.delete({ serverId: serverId });
        res.sendStatus(200);
    } catch (_) {
        res.sendStatus(500);
    }
});

router.patch('/server/user', ChangeUserPermValidator, async (req, res) => {
    try {
        const user = res.locals.user as User;
        user.isAdmin = !user.isAdmin;
        user.updateSelf();
        res.status(200).json({ isAdmin: user.isAdmin });
    } catch (_) {
        res.sendStatus(500);
    }
});

export default router;
