import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './expense/expense.module';
import { LoggerMiddleware } from './logger.middleware';
import { TimesheetModule } from './timesheet/timesheet.module';
import { ExpenseService } from './expense/expense.service';
import { ConfigModule } from './config-module/config.module';

@Module({
  imports: [ExpenseModule, TimesheetModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService, { provide: ExpenseService, useValue: {} }], // THIS COULD GIVE YOU ISSUES
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.ALL });
  }
}
