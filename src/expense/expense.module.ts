import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { ExpenseSchema } from '../schemas/expense.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://amir:test123@ds157707.mlab.com:57707/budget-api',
        useNewUrlParser: true,
      }),
    }),
  ],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
