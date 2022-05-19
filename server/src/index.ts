import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';

import ExampleRoute from './routes/AuthRoute';
import BasketRoute from './routes/BasketRoute';
import BotRoute from './routes/BotRoute';
import PaymentRoute from './routes/PaymentRoute';
import ProductRoute from './routes/ProductRoute';
import ServerRoute from './routes/ServerRoute';
import ShopRoute from './routes/ShopRoute';
import { getSnowflake } from './utils/functions';
import { AdminValidator, AuthValidator, BotValidator } from './validators/AuthValidator';

config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
    credentials: true,
    origin: true
}));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(helmet());
app.use(
    session({
        secret: process.env.SECRET || getSnowflake(),
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 3600000 }
    })
);

app.use('/auth', ExampleRoute);
app.use('/basket', AuthValidator, BasketRoute);
app.use('/bot', BotValidator, BotRoute);
app.use('/payment', AuthValidator, PaymentRoute);
app.use('/product', AuthValidator, AdminValidator, ProductRoute);
app.use('/server', AuthValidator, AdminValidator, ServerRoute);
app.use('/shop', AuthValidator, ShopRoute);

app.listen(port, () => console.log(`Application started at ${port}.`));
