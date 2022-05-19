import Server from '../models/Server';
import BaseCache from './BaseCache';

export default class ServerCache extends BaseCache<string> {
    async check(id: string) {
        if (!this.has(id)) {
            await Server.context.findOne({ id });
            this.add(id);
        }
    }
}
