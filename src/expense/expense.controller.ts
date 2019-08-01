import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { CreateExpenseDto } from './dto/createExpense.dto';

@Controller('expense')
export class ExpenseController {
    @Get()
    findAll() {
        return `This action returns all expenses`;
    }

    @Post()
    create(@Body() createExpenseDto: CreateExpenseDto) {
        return 'This action adds a new cat';
    }
}
