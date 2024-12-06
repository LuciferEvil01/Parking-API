import { Schema, model, Document } from 'mongoose';

interface ILog extends Document {
  user: string;
  action: string;
  timestamp: Date;
}

const logSchema = new Schema<ILog>({
  user: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export const Log = model<ILog>('Log', logSchema);
