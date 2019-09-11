import * as mongoose from 'mongoose';
import { TimesheetSchema } from './timesheet.schema';

export const PeriodSchema = new mongoose.Schema({
  timeslots: [TimesheetSchema],
  finished: Boolean,
  month: Number,
  year: Number,
});
