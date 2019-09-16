import {
  Controller,
  Delete,
  Param,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { editFileName } from './utilities';
import { FileInterceptor } from '@nestjs/platform-express';
import { TimesheetService } from './timesheet.service';
import { Timesheet, Period } from './interfaces/timesheet.dto';
import { CreateTimesheetDto } from './dto/createTimesheet.dto';
import { PeriodDto } from './dto/createPeriod.dto';

@Controller('timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @Get(':date')
  async findByDate(@Param('date') date: string): Promise<Period> {
    return this.timesheetService.findByDate(date);
  }

  @Get()
  async findAll(): Promise<Period[]> {
    return this.timesheetService.findAll();
  }

  @Post('update')
  async addToTimeslot(@Body() createPeriodDto: CreateTimesheetDto) {
    return this.timesheetService.addToTimeslot(createPeriodDto);
  }

  @Post()
  async create(@Body() createPeriodDto: PeriodDto) {
    return this.timesheetService.create(createPeriodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timesheetService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }
}
