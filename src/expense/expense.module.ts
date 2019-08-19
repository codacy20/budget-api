import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { ExpenseSchema } from '../schemas/expense.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }])],
    providers: [ExpenseService],
    controllers: [ExpenseController],
})
export class ExpenseModule { }
