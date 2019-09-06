import { Document } from 'mongoose';

export interface Timesheet extends Document {
  hours: number;
  date: Date;
  category: string;
}

export interface Period extends Document {
  timeslots: [Timesheet];
  finished: boolean;
  start: Date;
  end: Date;
}
