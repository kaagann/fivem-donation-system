const NodeRSA = require('node-rsa');
const fs = require('fs');
const path = require('path');

const key = new NodeRSA({ b: 512 });
const privateKey = key.exportKey('private');
const publicKey = key.exportKey('public');

fs.writeFileSync(path.resolve(__dirname, '../keys/private.key'), privateKey);
fs.writeFileSync(path.resolve(__dirname, '../keys/public.key'), publicKey);

console.log('Keys generated. Check the keys folder.');
