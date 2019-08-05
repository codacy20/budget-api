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
        await createdExpense.save();
        return createdExpense;
    }

    async findAll(): Promise<Expense[]> {
        return await this.expenseModel.find().exec();
    }

    async remove(id: string): Promise<Expense> {
        const obj: Expense = await this.expenseModel.findById({ _id: id }).exec();
        if (obj) {
            await this.expenseModel.findByIdAndRemove({ _id: id });
            return obj;
        }
    }
}
