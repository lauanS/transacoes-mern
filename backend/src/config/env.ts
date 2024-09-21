import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);

dotenv.config({
  path: envPath
});
