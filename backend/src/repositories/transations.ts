import type { Transation } from '@/types/transations';
import TransationModel from '@/models/Transation';

export default class TransationRepository {
  static create(transation: Transation) {
    return TransationModel.create(transation);
  }

  static list(
    filters: { name?: string, startDate?: Date },
    pagination: { page: number, pageSize: number }
  ) {
    return TransationModel.aggregate([
      {
        $match: {
          ...(filters.name && {
            name: {
              $regex: filters.name, $options: 'i'
            }
          }),
          ...(filters.startDate && {
            date: {
              $gte: filters.startDate
            }
          })
        }
      },
      {
        $facet: {
          metadata: [{ $count: 'totalCount' }],
          data: [
            { $skip: (pagination.page - 1) * pagination.pageSize },
            { $limit: pagination.pageSize }
          ]
        }
      }
    ]);
  }
}
