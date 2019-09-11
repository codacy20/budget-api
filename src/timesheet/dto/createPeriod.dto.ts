import { Timesheet } from '../interfaces/timesheet.dto';

export class PeriodDto {
  timeslots: Timesheet[];
  finished: boolean;
  month: number;
  year: number;
}
