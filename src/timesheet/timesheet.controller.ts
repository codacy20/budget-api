import { Controller, Delete, Param, Post, Get, Body } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { Timesheet } from './interfaces/timesheet.dto';
import { CreateTimesheetDto } from './dto/createTimesheet.dto';

@Controller('timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  // @Get(':date')
  // async findByDate(@Param('date') date: string): Promise<Timesheet[]> {
  //     return this.expenseService.findByDate(date);
  // }

  @Get()
  async findAll(): Promise<Timesheet[]> {
    return this.timesheetService.findAll();
  }

  @Post()
  async create(@Body() createExpenseDto: CreateTimesheetDto) {
    return this.timesheetService.create(createExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timesheetService.remove(id);
  }
}
