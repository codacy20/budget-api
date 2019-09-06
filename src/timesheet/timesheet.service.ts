import { Injectable } from '@nestjs/common';
import { Period } from './interfaces/timesheet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PeriodDto } from '../timesheet/dto/createPeriod.dto';
import { Model } from 'mongoose';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectModel('timesheet') private readonly timePeriodModel: Model<Period>,
  ) {}

  async create(timesheet: PeriodDto): Promise<Period> {
    const createdTimesheet = new this.timePeriodModel(timesheet);
    await createdTimesheet.save();
    return createdTimesheet;
  }

  async findAll(): Promise<Period[]> {
    return await this.timePeriodModel.find().exec();
  }

  async remove(id: string): Promise<Period> {
    const obj: Period = await this.timePeriodModel.findById({ _id: id }).exec();
    if (obj) {
      await this.timePeriodModel.findByIdAndRemove({ _id: id });
      return obj;
    }
  }
}
