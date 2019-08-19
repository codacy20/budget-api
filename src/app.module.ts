import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './expense/expense.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './logger.middleware';
import { ExpenseController } from './expense/expense.controller';

@Module({
  imports: [ExpenseModule, MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: 'mongodb://amir:test123@ds157707.mlab.com:57707/budget-api',
      useNewUrlParser: true,
    }),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(ExpenseController);
  }
}
