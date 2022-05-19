import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import MongoDBContext from '../classes/MongoDBContext';

@Entity({ name: 'users' })
export default class User {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    id: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    steam_hex: string;

    @Column()
    discordId: string;

    @Column()
    serverId: string;

    @Column()
    isAdmin: boolean;

    @Column()
    balance: number;

    @Column()
    basket: string[];

    @Column()
    usedTokens: string[];

    constructor(data: Partial<User>) {
        Object.assign(this, { ...data });
    }

    static context = new MongoDBContext(User);

    static getSafeData(data: Partial<User>) {
        return { ...data, _id: undefined, password: undefined };
    }

    async updateSelf() {
        await User.context.update(
            { id: this.id, serverId: this.serverId },
            this
        );
    }
}
