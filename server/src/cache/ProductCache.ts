import Product from '../models/Product';
import BaseCache from './BaseCache';

export default class ProductCache extends BaseCache<string> {
    async check(id: string) {
        if (!this.has(id)) {
            await Product.context.findOne({ id });
            this.add(id);
        }
    }
}
