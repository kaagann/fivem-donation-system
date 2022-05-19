import { NextFunction, Request, Response } from 'express';

import Product from '../models/Product';
import User from '../models/User';
import messages from '../utils/messages';

export async function BuyValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const user = res.locals.user as User;

    if (!user.basket.length)
        return res.status(403).json({ error: messages.EMPTY_BASKET });

    const products: Product[] = [];

    for (const productId of user.basket) {
        try {
            products.push(
                await Product.context.findOne({
                    id: productId,
                    serverId: user.serverId
                })
            );
        } catch (_) {
            res.sendStatus(500);
        }
    }

    const total = products
        .map(x => x.price)
        .reduce((prev, curr) => prev + curr);

    if (user.balance < total)
        return res.json({ error: messages.INSUFFICIENT_BALANCE });

    res.locals.products = products;
    res.locals.totalPrice = total;

    next();
}
