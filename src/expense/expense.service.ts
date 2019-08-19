import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExpenseDto } from './dto/createExpense.dto';
import { Expense } from './interfaces/expense.dto';
import { Model } from 'mongoose';

@Injectable()
export class ExpenseService {

    async findByDate(date: string): Promise<Expense[]> {
        const dateIso = new Date(date);
        const year = dateIso.getFullYear();
        const month = dateIso.getMonth() + 1;
        const monthPlusOne = dateIso.getMonth() + 2;
        const obj: Expense[] = await this.expenseModel.find(
            {
                date:
                {
                    $gte: new Date(year + '-' + month),
                    $lte: new Date(year + '-' + monthPlusOne),
                },
            },
        ).exec();
        return obj;
    }

    constructor(@InjectModel('Expense') private readonly expenseModel: Model<Expense>) { }

    async create(expense: CreateExpenseDto): Promise<Expense> {
        const createdExpense = new this.expenseModel(expense);
        await createdExpense.save();
        return createdExpense;
    }

    public async findAll(): Promise<Expense[]> {
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
