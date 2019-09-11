import { Injectable, BadRequestException } from '@nestjs/common';
import { Period } from './interfaces/timesheet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PeriodDto } from '../timesheet/dto/createPeriod.dto';
import { Model } from 'mongoose';
import { CreateTimesheetDto } from './dto/createTimesheet.dto';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectModel('timesheet') private readonly timePeriodModel: Model<Period>,
  ) {}

  async addToTimeslot(timesheet: CreateTimesheetDto): Promise<void> {
    const dateObj = new Date(timesheet.date);
    const check = await this.check(
      dateObj.getMonth() + 1,
      dateObj.getFullYear(),
    );
    if (!check) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'we can not find the timeslot',
      });
    }
    const obj: Period = await this.timePeriodModel
      .findOne({ month: dateObj.getMonth() + 1 })
      .exec();
    return await this.timePeriodModel.update(
      { _id: obj._id },
      { $push: { timeslots: timesheet } },
    );
  }

  async create(timesheet: PeriodDto): Promise<Period> {
    const check = await this.check(timesheet.month, timesheet.year);
    if (check) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'A similar timeslot was found',
      });
    }
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

  async check(month: number, year: number) {
    const obj: Period = await this.timePeriodModel.findOne({ month }).exec();
    if (obj) {
      if (obj.year === Math.abs(year)) {
        return true;
      }
    }
    return false;
  }
}
