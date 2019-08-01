import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './expense/expense.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [ExpenseModule, MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: 'mongodb://amir:test123@ds157707.mlab.com:57707/budget-api',
    }),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
