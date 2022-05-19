import axios from 'axios';
import { Router } from 'express';

import Product from '../models/Product';
import Server from '../models/Server';
import User from '../models/User';
import { BuyValidator } from '../validators/ShopValidator';

const router = Router();

router.post('/buy', BuyValidator, async (req, res) => {
    const user = res.locals.user as User;
    const products = res.locals.products as Product[];
    const totalPrice = res.locals.totalPrice as number;


    user.balance -= totalPrice;
    user.basket = [];

    try {
        await user.updateSelf();

        const server = await Server.context.findOne({ id: user.serverId });

        // const body = {
        //     steam_hex: user.steam_hex,
        //     items: products.map(x => x.items)
        // };

        // await axios({
        //     method: 'POST',
        //     url: server.ip,
        //     data: body
        // });

        res.sendStatus(200);
    } catch (_) {
        res.sendStatus(500);
    }
});

export default router;
