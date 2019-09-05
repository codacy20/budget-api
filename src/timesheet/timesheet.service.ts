import { Injectable } from '@nestjs/common';
import { Timesheet } from './interfaces/timesheet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTimesheetDto } from './dto/createTimesheet.dto';
import { Model } from 'mongoose';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectModel('timesheet') private readonly timesheetModel: Model<Timesheet>,
  ) {}

  async create(timesheet: CreateTimesheetDto): Promise<Timesheet> {
    const createdTimesheet = new this.timesheetModel(timesheet);
    await createdTimesheet.save();
    return createdTimesheet;
  }

  async findAll(): Promise<Timesheet[]> {
    return await this.timesheetModel.find().exec();
  }

  async remove(id: string): Promise<Timesheet> {
    const obj: Timesheet = await this.timesheetModel
      .findById({ _id: id })
      .exec();
    if (obj) {
      await this.timesheetModel.findByIdAndRemove({ _id: id });
      return obj;
    }
  }
}
