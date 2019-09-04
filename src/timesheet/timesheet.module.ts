import { Module } from '@nestjs/common';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TimesheetSchema } from '../schemas/timesheet.schema';
import { ConfigModule } from '../config-module/config.module';
import { ConfigService } from '../config-module/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('DATABASE_EXPENSES'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'timesheet', schema: TimesheetSchema }]),
  ],
  providers: [TimesheetService],
  controllers: [TimesheetController],
})
export class TimesheetModule {}
