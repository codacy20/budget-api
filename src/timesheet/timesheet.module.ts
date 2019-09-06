import { Module } from '@nestjs/common';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config-module/config.module';
import { ConfigService } from '../config-module/config.service';
import { PeriodSchema } from '../schemas/period.schema';

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
    MongooseModule.forFeature([{ name: 'timesheet', schema: PeriodSchema }]),
  ],
  providers: [TimesheetService],
  controllers: [TimesheetController],
})
export class TimesheetModule {}
