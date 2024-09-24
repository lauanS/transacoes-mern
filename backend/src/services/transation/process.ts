import fs from 'fs';
import readline from 'readline';
import TransationRepository from '@/repositories/transations';
import { registerIssueWithTransaction } from '@/utils';
import { MongoError } from 'mongodb';

const processLine = (line: string) => {
  const [id, name, doc, date, value] = line
    .split(';')
    .map((item) => item.split(':')[1]);

  TransationRepository.create({
    id,
    name,
    doc,
    date: new Date(date),
    value: Number(value)
  }).catch(error => {
    const isDuplicatedKey = error instanceof MongoError && error.code === 11000;
    if (isDuplicatedKey) {
      return;
    }

    registerIssueWithTransaction(line);
  });
};

const finishProcess = (filePath: string) => {
  fs.unlink(filePath, (error) => {
    if (error) {
      console.log(`Error when deleting file ${filePath}`);
    }
  });
};

const processTransations = (filePath: string) => {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on('line', (line) => processLine(line));
  rl.on('close', () => finishProcess(filePath));
};

export default processTransations;
