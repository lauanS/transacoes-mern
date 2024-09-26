import { MongoError } from 'mongodb';

export const registerIssueWithTransaction = (line: string) => {
  console.log('error processing transaction:', line);
};

export const processError = (error: Error, line: string) => {
  const isDuplicatedKey = error instanceof MongoError && error.code === 11000;
  if (isDuplicatedKey) {
    return;
  }

  registerIssueWithTransaction(line);
};

export const registerTimeToProcessFile = (filename: string, startTime: Date) => {
  const endTime = new Date();
  const timeTotal = endTime.getTime() - startTime.getTime();
  console.log(`Time to process file ${filename}: ${timeTotal}ms`);
};
