import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExpenseDto } from './dto/createExpense.dto';
import { Expense } from './interfaces/expense.dto';
import { Model } from 'mongoose';

@Injectable()
export class ExpenseService {

    constructor(@InjectModel('Expense') private readonly expenseModel: Model<Expense>) { }

    async create(expense: CreateExpenseDto): Promise<Expense> {
        const createdExpense = new this.expenseModel(expense);
        return await createdExpense.save();
    }

    async findAll(): Promise<Expense[]> {
        return await this.expenseModel.find().exec();
    }

    async remove(name: string): Promise<Expense> {
        const obj: Expense = await this.expenseModel.findOne({ name }).exec();
        if (obj) {
            await this.expenseModel.findOneAndRemove({ name });
            return obj;
        }
    }
}
