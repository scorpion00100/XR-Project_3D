// generate-secret-key.ts
import * as crypto from 'crypto';

// Génère une clé secrète aléatoire de 64 caractères (512 bits)
const secretKey = crypto.randomBytes(64).toString('hex');
console.log('Generated secret key:', secretKey);
