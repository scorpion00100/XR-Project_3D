// src/utils/generate-secret-key.ts
import { createHash } from 'crypto';

// Génère une clé secrète aléatoire de 32 octets
const generateSecretKey = (): string => {
  const secretKey = createHash('sha256')
    .update(Math.random().toString())
    .digest('hex');
  return secretKey;
};

console.log(generateSecretKey());
