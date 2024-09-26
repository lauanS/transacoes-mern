import fs from 'fs';
import path from 'path';
import readline from 'readline';
import TransationRepository from '@/repositories/transations';
import UserRepository from '@/repositories/user';
import { processError, registerTimeToProcessFile } from '@/utils';

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

const finishProcess = (filePath: string, processStartTime: Date) => {
  fs.unlink(filePath, (error) => {
    if (error) {
      console.log(`Error when deleting file ${filePath}`);
    }
  });

  registerTimeToProcessFile(path.basename(filePath), processStartTime);
};

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
