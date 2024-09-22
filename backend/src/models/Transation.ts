import type { Transation } from '@/types/transations';
import { Schema, model } from 'mongoose';

const TransationSchema = new Schema<Transation>({
  id: { type: 'string', unique: true },
  name: { type: 'string', required: true },
  doc: { type: 'string' },
  date: { type: 'date' },
  value: { type: 'number' }
}, { versionKey: false });

const Transation = model<Transation>('transation', TransationSchema);

export default Transation;
