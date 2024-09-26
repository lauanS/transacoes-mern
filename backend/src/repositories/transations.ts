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
          ...(filters.startDate && {
            date: {
              $gte: filters.startDate
            }
          })
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'doc',
          foreignField: 'doc',
          as: 'user'
        }
      },
      {
        $project: {
          id: true,
          date: true,
          value: true,
          doc: true,
          name: '$user.name'
        }
      },
      {
        $match: {
          ...(filters.name && {
            name: {
              $regex: filters.name, $options: 'i'
            }
          }),
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
