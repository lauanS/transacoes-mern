import TransationRepository from '@/repositories/transations';

type Params = {
  name?: string,
  startDate?: Date
}

type PaginationParams = {
  page: number,
  pageSize: number
}

/**
 * @function listTransations
 * @description Lista as transações
 * @param {Request} params - Parâmetros de busca
 * @param {Request} pagination - Paginação
 * @returns {Promise<Transation>} - Retorna as transações
 */
const listTransations = (params: Params, pagination: PaginationParams) => {
  return TransationRepository.list(params, pagination);
};

export default listTransations;
