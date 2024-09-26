import type { Transation } from '@/types/transations';
import { Schema, model } from 'mongoose';

const TransationSchema = new Schema<Transation>({
  id: { type: 'string', unique: true },
  date: { type: 'date' },
  value: { type: 'number' },
  doc: { type: 'string' }
}, { versionKey: false });

const Transation = model<Transation>('transation', TransationSchema);

export default Transation;
