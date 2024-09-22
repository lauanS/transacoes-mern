import fs from 'fs';
import readline from 'readline';
import TransationRepository from '@/repositories/transations';

const processTransations = (filePath: string) => {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on('line', (line) => {
    const [id, name, doc, date, value] = line
      .split(';')
      .map((item) => item.split(':')[1]);

    TransationRepository.create({
      id,
      name,
      doc,
      date: new Date(date),
      value: Number(value)
    });
  });

  rl.on('close', () => {
    console.log(`
      File ${filePath} processing completed.
      todo: exclude file
    `);
  });
};

export default processTransations;
