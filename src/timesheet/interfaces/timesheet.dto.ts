import { Document } from 'mongoose';

export interface Timesheet extends Document {
  hours: number;
  date: Date;
  category: string;
}
