import {
  Controller,
  Get,
  Query,
  Body,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/createExpense.dto';
import { ExpenseService } from './expense.service';
import { Expense } from './interfaces/expense.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../timesheet/utilities';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get(':date')
  async findByDate(@Param('date') date: string): Promise<Expense[]> {
    return this.expenseService.findByDate(date);
  }

  @Get()
  async findAll(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `./uploadReceipt/${new Date().getFullYear()}-${new Date().getMonth() +
          1}`,
        filename: editFileName,
      }),
    }),
  )
  uploadFile(@UploadedFile() file, @Param('id') id: string) {
    const upadte = this.expenseService.uploadFile(id, file.destination);
    let response;
    if (typeof upadte === 'object') {
      response = {
        upload: true,
        destination: file.destination,
        filename: file.filename,
      };
    } else {
      response = {
        upaload: false,
        destination: null,
        filename: null,
      };
    }
    return response;
  }
}
