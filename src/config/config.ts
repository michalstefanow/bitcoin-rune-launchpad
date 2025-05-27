import dotenv from 'dotenv';
import { logger } from '../utils/logger';

// Load environment variables
dotenv.config();

interface Config {
  port: number;
  mongoUri: string;
  jwtSecret: string;
  web3Provider: string;
  ordinalsApiUrl: string;
  telegramBotToken: string;
  environment: string;
}

// Validate required environment variables
const requiredEnvVars = [
  'PORT',
  'MONGO_URI',
  'JWT_SECRET',
  'WEB3_PROVIDER',
  'ORDINALS_API_URL',
  'TELEGRAM_BOT_TOKEN',
  'NODE_ENV'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    logger.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

export const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  web3Provider: process.env.WEB3_PROVIDER || '',
  ordinalsApiUrl: process.env.ORDINALS_API_URL || '',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
  environment: process.env.NODE_ENV || 'development'
}; 