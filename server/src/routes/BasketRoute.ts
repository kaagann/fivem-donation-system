import { Router } from 'express';

import Product from '../models/Product';
import User from '../models/User';
import { BasketValidator } from '../validators/BasketValidator';

const router = Router();

const getBasket = async (user: User) => {
    const data: any[] = [];

    for (const id of user.basket) {
        try {
            const product = await Product.context.findOne({
                id,
                serverId: user.serverId
            });
            data.push(product.getData());
        } catch (_) {
            user.basket.splice(
                user.basket.findIndex(x => x === id),
                1
            );
            await user.updateSelf();
        }
    }

    return data;
};

router.get('/', async (req, res) => {
    const user = res.locals.user as User;
    res.status(200).json(await getBasket(user));
});

router.post('/', BasketValidator, async (req, res) => {
    const { productId } = req.body;
    const user = res.locals.user as User;

    user.basket.push(productId);

    try {
        user.updateSelf();

        res.status(200).json(await getBasket(user));
    } catch (_) {
        res.sendStatus(500);
    }
});

router.delete('/', BasketValidator, async (req, res) => {
    const { productId } = req.body;
    const user = res.locals.user as User;

    user.basket.splice(
        user.basket.findIndex(x => x == productId),
        1
    );

    try {
        user.updateSelf();

        res.status(200).json(await getBasket(user));
    } catch (_) {
        res.sendStatus(500);
    }
});

export default router;
