import { NextFunction, Request, Response } from 'express';

import { productCache } from '../cache';
import Validate from '../classes/Validate';

// Always call after AuthValidator
export async function BasketValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { productId } = req.body;
    if (!Validate.snowflake(productId)) return res.sendStatus(400);

    try {
        await productCache.check(productId);

        next();
    } catch (_) {
        res.sendStatus(404);
    }
}
