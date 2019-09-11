import { Injectable, BadRequestException } from '@nestjs/common';
import { Period, Timesheet } from './interfaces/timesheet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PeriodDto } from '../timesheet/dto/createPeriod.dto';
import { Model } from 'mongoose';
import { CreateTimesheetDto } from './dto/createTimesheet.dto';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectModel('timesheet') private readonly timePeriodModel: Model<Period>,
  ) {}

  async addToTimeslot(timesheet: CreateTimesheetDto): Promise<Period> {
    const dateObj = new Date(timesheet.date);
    const check = await this.check(
      dateObj.getMonth() + 1,
      dateObj.getFullYear(),
    );
    if (check === 0) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'we can not find the timeslot',
      });
    }
    return await this.timePeriodModel.findOneAndUpdate(
      { _id: check },
      { $push: { timeslots: timesheet } },
      (err, doc) => {
        return doc;
      },
    );
  }

  async create(timesheet: PeriodDto): Promise<Period> {
    const check = await this.check(timesheet.month, timesheet.year);
    if (check !== 0) {
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
        return obj.id;
      }
    }
    return 0;
  }
}
