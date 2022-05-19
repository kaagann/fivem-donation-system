import { Router } from 'express';

import User from '../models/User';
import { encryptWithSHA256, getSnowflake } from '../utils/functions';
import { LoginValidator, RegisterValidator } from '../validators/AuthValidator';

const router = Router();

router.post('/register', RegisterValidator, async (req, res) => {
    const { username, password, email, steam_hex, discordId, serverId } =
        req.body;

    const user = new User({
        id: getSnowflake(),
        username,
        email,
        steam_hex,
        discordId,
        serverId,
        isAdmin: false,
        balance: 0,
        password: encryptWithSHA256(password),
        basket: [],
        usedTokens: []
    });

    try {
        await User.context.save(user);
        res.sendStatus(200);
    } catch (_) {
        res.sendStatus(500);
    }
});

router.post('/login', LoginValidator, async (req, res) => {
    const { username, password, serverId } = req.body;

    if (req.session.user) delete req.session.user;

    try {
        const user = await User.context.findOne({
            serverId,
            username,
            password: encryptWithSHA256(password)
        });

        req.session.user = {
            id: user.id,
            serverId: user.serverId
        };

        res.status(200).json(User.getSafeData(user));
    } catch (_) {
        res.sendStatus(404);
    }
});

router.post("/getData", async (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
    const userData = await User.context.findOne({
        serverId: req.session.user?.serverId,
        id: req.session.user?.id
    })
    res.status(200).json(User.getSafeData(userData))
})

router.post('/logout',  (req, res) => {
    if (req.session.user) delete req.session.user;
    res.sendStatus(200);
});

export default router;
