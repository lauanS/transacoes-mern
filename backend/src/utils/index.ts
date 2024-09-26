import { MongoError } from 'mongodb';

/**
 * @function registerIssueWithTransaction
 * @description Função fake para representar o tratamento de problemas com as requisições,
 * Nesse repositório apenas loga elas no console
 *
 * @param {string} line - A linha da transação com erro.
 */
export const registerIssueWithTransaction = (line: string) => {
  console.log('error processing transaction:', line);
};

/**
 * @function processError
 * @description Trata erros durante a inserção de usuários ou transações no banco.
 * Em especial, cuida do caso de dados duplicados
 *
 * @param {Error} error - O erro ocorrido.
 * @param {string} line - A linha da transação que causou o erro.
 */
export const processError = (error: Error, line: string) => {
  const isDuplicatedKey = error instanceof MongoError && error.code === 11000;
  if (isDuplicatedKey) {
    return;
  }

  registerIssueWithTransaction(line);
};

/**
 * @function registerTimeToProcessFile
 * @description Calcula e exibe o tempo total gasto para processar o arquivo.
 *
 * @param {string} filename - O nome do arquivo processado.
 * @param {Date} startTime - A hora em que o processamento começou.
 */
export const registerTimeToProcessFile = (filename: string, startTime: Date) => {
  const endTime = new Date();
  const timeTotal = endTime.getTime() - startTime.getTime();
  console.log(`Time to process file ${filename}: ${timeTotal}ms`);
};
