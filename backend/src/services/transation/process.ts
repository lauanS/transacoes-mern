import fs from 'fs';
import path from 'path';
import readline from 'readline';
import TransationRepository from '@/repositories/transations';
import UserRepository from '@/repositories/user';
import { processError, registerTimeToProcessFile } from '@/utils';

/**
 * @function processLine
 * @description Processa uma linha de transação
 * @param {string} line - String contendo os dados da transação.
 */
const processLine = (line: string) => {
  const [id, name, doc, date, value] = line
    .split(';')
    .map((item) => item.split(':')[1]);

  UserRepository.create({ name, doc })
    .catch((error) => processError(error, line));

  TransationRepository.create({
    id,
    date: new Date(date),
    value: Number(value),
    doc: doc
  })
    .catch((error) => processError(error, line));
};

/**
 * @function finishProcess
 * @description Finaliza o processamento do arquivo, removendo ele do sistema e registrando o tempo utilizado.
 *
 * @param {string} filePath - Caminho do arquivo processado.
 * @param {Date} processStartTime - Tempo de início do processamento.
 */
const finishProcess = (filePath: string, processStartTime: Date) => {
  fs.unlink(filePath, (error) => {
    if (error) {
      console.log(`Error when deleting file ${filePath}`);
    }
  });

  registerTimeToProcessFile(path.basename(filePath), processStartTime);
};

/**
 * @function processTransations
 * @description Processa as transações de um arquivo.
 * @param {string} filePath - Caminho do arquivo contendo as transações.
 */
const processTransations = (filePath: string) => {
  const fileStream = fs.createReadStream(filePath);
  const processStartTime = new Date();

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on('line', (line) => processLine(line));
  rl.on('close', () => finishProcess(filePath, processStartTime));
};

export default processTransations;
