import { Controller, Get, Query, Body, Post, Delete, Param } from '@nestjs/common';
import { CreateExpenseDto } from './dto/createExpense.dto';
import { ExpenseService } from './expense.service';
import { Expense } from './interfaces/expense.dto';

@Controller('expense')
export class ExpenseController {

    constructor(private readonly expenseService: ExpenseService) { }

    @Get()
    async findAll(): Promise<Expense[]> {
        return this.expenseService.findAll();
    }

    @Post()
    async create(@Body() createExpenseDto: CreateExpenseDto) {
        this.expenseService.create(createExpenseDto);
    }

    @Delete(':name')
    remove(@Param('name') name: string) {
        return this.expenseService.remove(name);
    }
}
