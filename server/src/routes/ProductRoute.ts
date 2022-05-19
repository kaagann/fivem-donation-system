import { Router } from 'express';

import { productCache } from '../cache';
import Product from '../models/Product';
import User from '../models/User';
import { getSnowflake } from '../utils/functions';
import { BasketValidator } from '../validators/BasketValidator';
import { CreateProductValidator } from '../validators/ProductValidator';

const router = Router();

router.get('/', async (req, res) => {
    const user = res.locals.user as User;
    const products = await Product.context.find({ serverId: user.serverId });
    res.status(200).json(products.map(x => x.getData()));
});

router.post('/', CreateProductValidator, async (req, res) => {
    const { name, description, price, photo, items } = req.body;

    const product = new Product({
        name,
        description,
        price: Number(price),
        photo,
        items,
        serverId: req.session.user!.serverId,
        id: getSnowflake()
    });

    try {
        await Product.context.save(product);
        res.status(200).json(product.getData());
    } catch (_) {
        res.sendStatus(500);
    }
});

router.delete('/', BasketValidator, async (req, res) => {
    const { productId } = req.body;

    productCache.remove(productId);

    try {
        await Product.context.delete({ id: productId });
        res.sendStatus(200);
    } catch (_) {
        res.sendStatus(500);
    }
});

export default router;
