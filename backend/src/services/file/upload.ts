import { Request } from 'express';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

const uploadFile = (req: Request): Promise<string> => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(process.cwd(), `/${crypto.randomUUID()}.txt`);
    const stream = fs.createWriteStream(filePath);

    stream.on('open', () => {
      req.pipe(stream);
    });

    stream.on('close', () => {
      resolve(filePath);
    });

    stream.on('error', err => {
      console.error(err);
      reject(err);
    });
  });
};

export default uploadFile;
