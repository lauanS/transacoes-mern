import { Request } from 'express';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

/**
 * @function uploadFile
 * @description Realiza o upload de um arquivo vindo da requisição HTTP e salva no sistema de arquivos.
 * @param {Request} req - Requisição HTTP
 * @returns {Promise<string>} - Retorna o caminho do arquivo ou um erro.
 */
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
