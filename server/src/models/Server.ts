import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import MongoDBContext from '../classes/MongoDBContext';

@Entity({ name: 'servers' })
export default class Server {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    id: string;

    @Column()
    name: string;

    @Column()
    photo: string;

    @Column()
    ip: string;

    @Column()
    paymentWebhook: string;

    constructor(data: Partial<Server>) {
        Object.assign(this, { ...data });
    }

    static context = new MongoDBContext(Server);
}
