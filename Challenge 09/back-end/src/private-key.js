import * as fs from 'fs';
export const privateKey = fs.readFileSync('private-key.txt');
