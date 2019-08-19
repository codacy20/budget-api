import { Module } from '@nestjs/common';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TimesheetSchema } from '../schemas/timesheet.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Timesheet', schema: TimesheetSchema }])],
    providers: [TimesheetService],
    controllers: [TimesheetController],
})
export class TimesheetModule { }
