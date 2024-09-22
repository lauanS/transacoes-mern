import TransationRepository from '@/repositories/transations';

type Params = {
  name?: string,
  startDate?: Date
}

type PaginationParams = {
  page: number,
  pageSize: number
}

const listTransations = (params: Params, pagination: PaginationParams) => {
  return TransationRepository.list(params, pagination);
};

export default listTransations;
