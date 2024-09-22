import type { Transation } from '@/types/transations';
import TransationModel from '@/models/Transation';

export default class TransationRepository {
  static create(transation: Transation) {
    return TransationModel.create(transation);
  }
}
