import axios from 'axios';
import { Router } from 'express';

import Server from '../models/Server';
import User from '../models/User';
import { PaymentData } from '../utils/interfaces';
import { KPaymentValidator } from '../validators/PaymentValidator';

const router = Router();

router.post('/', KPaymentValidator, async (req, res) => {
    const { token } = req.body;
    const user = res.locals.user as User;
    const data = res.locals.data as PaymentData;

    user.balance += data.amount;
    user.usedTokens.push(token);
    await user.updateSelf();

    res.sendStatus(200);

    try {
        const server = await Server.context.findOne({ id: user.serverId });

        const discordMessage = {
            embeds: [
                {
                    color: 15570276,
                    title: 'Ödeme alındı',
                    fields: [
                        {
                            name: 'Discord Id',
                            value: user.discordId,
                            inline: true
                        },
                        {
                            name: 'Steam Hex',
                            value: user.steam_hex,
                            inline: true
                        },
                        {
                            name: 'Yüklenen Miktar',
                            value: `**${data.amount} TRY**`,
                            inline: true
                        }
                    ],
                    timestamp: new Date(data.timestamp * 1000)
                }
            ]
        };

        await axios({
            method: 'POST',
            url: server.paymentWebhook,
            data: discordMessage
        });
    } catch (_) {}
});

export default router;
