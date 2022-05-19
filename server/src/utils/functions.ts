import { SHA256 } from 'crypto-js';
import { UniqueID } from 'nodejs-snowflake';

const uid = new UniqueID();

export function encryptWithSHA256(str: string) {
    return SHA256(str).toString();
}

export function getSnowflake() {
    return uid.getUniqueID() as string;
}
