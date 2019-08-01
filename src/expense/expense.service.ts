import { Injectable } from '@nestjs/common';
import { Expense } from './interfaces/expense.dto'
@Injectable()
export class ExpenseService {
    private readonly expenses: Expense[] = [];

    create(expense: Expense) {
        this.expenses.push(expense);
    }

    findAll(): Expense[] {
        return this.expenses;
    }
}
