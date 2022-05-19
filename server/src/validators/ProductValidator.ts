import { NextFunction, Request, Response } from 'express';

import Validate from '../classes/Validate';

export async function CreateProductValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let { name, description, price, photo, items } = req.body;

    if (
        !Validate.string(name) ||
        !Validate.string(description) ||
        !Validate.number(price) ||
        !Validate.url(photo) ||
        !Validate.array(items)
    )
        return res.sendStatus(400);
    
    items = JSON.parse(items);
    if (!Array.isArray(items)) return res.sendStatus(400);

    for (const item of items) {
        if (!item.id || !item.quantity) {
            return res.sendStatus(400);
        }
        continue;
    }

    next();
}
