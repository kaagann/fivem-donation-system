import ProductCache from './ProductCache';
import ServerCache from './ServerCache';

const serverCache = new ServerCache();
const productCache = new ProductCache();

export { serverCache, productCache };
