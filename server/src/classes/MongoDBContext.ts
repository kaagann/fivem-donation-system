import {
    createConnection,
    DeepPartial,
    EntityTarget,
    FindConditions,
    FindManyOptions,
    FindOneOptions,
    getConnectionManager,
    MongoRepository
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export default class MongoDBContext<Entity> {
    private repository: MongoRepository<Entity>;

    constructor(entity: EntityTarget<Entity>) {
        createConnection()
            .then(connection => {
                this.repository = connection.getMongoRepository(entity);
            })
            .catch(error => {
                if (error.name === 'AlreadyHasActiveConnectionError') {
                    const connection = getConnectionManager().get('default');
                    this.repository = connection.getMongoRepository(entity);
                } else throw error;
            });
    }

    async save<T extends DeepPartial<Entity>>(entity: T) {
        return await this.repository.save(entity);
    }

    async find(options: FindConditions<Entity> | FindManyOptions<Entity>) {
        return await this.repository.find(options);
    }

    async findOne(condition: FindConditions<Entity>, options: FindOneOptions<Entity> | undefined = undefined) {
        return await this.repository.findOneOrFail(condition, options);
    }

    async delete(options: FindConditions<Entity>) {
        await this.repository.delete(options);
    }

    async update(options: FindConditions<Entity>, entity: QueryDeepPartialEntity<Entity>) {
        await this.repository.update(options, entity);
    }
}
