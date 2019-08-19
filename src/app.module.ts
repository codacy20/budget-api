import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './expense/expense.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './logger.middleware';
import { TimesheetController } from './timesheet/timesheet.controller';
import { TimesheetService } from './timesheet/timesheet.service';
import { TimesheetModule } from './timesheet/timesheet.module';

@Module({
  imports: [ExpenseModule, MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: 'mongodb://amir:test123@ds157707.mlab.com:57707/budget-api',
      useNewUrlParser: true,
    }),
  }), TimesheetModule],
  controllers: [AppController, TimesheetController],
  providers: [AppService, TimesheetService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware).forRoutes(({ path: '/', method: RequestMethod.ALL }));
  }
}
