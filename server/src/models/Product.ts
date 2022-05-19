import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import MongoDBContext from '../classes/MongoDBContext';
import { ProductItem } from '../utils/interfaces';

@Entity({ name: 'products' })
export default class Product {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    photo: string;

    @Column()
    items: ProductItem[];

    @Column()
    serverId: string;

    constructor(data: Partial<Product>) {
        Object.assign(this, { ...data });
    }

    static context = new MongoDBContext(Product);

    getData() {
        return {
            ...this,
            _id: undefined,
            // items: undefined,
            serverId: undefined
        };
    }
}
