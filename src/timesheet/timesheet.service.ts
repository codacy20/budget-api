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
    const check = await this.checkReturnID(
      dateObj.getMonth() + 1,
      dateObj.getFullYear(),
    );
    if (check === 0) {
      this.badRequest();
    }
    const updatedUser = this.timePeriodModel.findOneAndUpdate(
      { _id: check },
      { $push: { timeslots: timesheet } },
      { upsert: true, new: true },
    );
    return updatedUser;
  }

  async create(timesheet: PeriodDto): Promise<Period> {
    const check = await this.checkReturnID(timesheet.month, timesheet.year);
    if (check !== 0) {
      this.badRequest();
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
      this.timePeriodModel.findByIdAndRemove({ _id: id });
      return obj;
    }
  }

  async removeTimeslot(id: string, timeslotId: string): Promise<Period> {
    const obj: Period = await this.timePeriodModel.findById({ _id: id }).exec();
    if (obj) {
      const timeslotIdFound = obj.timeslots.filter(
        element => element._id != timeslotId,
      );
      if (timeslotIdFound.length === obj.timeslots.length) {
        this.badRequest();
      }
      const updatedUser = this.timePeriodModel.findOneAndUpdate(
        { _id: id },
        { timeslots: timeslotIdFound },
        { upsert: true, new: true },
      );
      return updatedUser;
    } else {
      this.badRequest();
    }
  }

  async checkReturnID(month: number, year: number) {
    const obj: Period = await this.timePeriodModel.findOne({ month }).exec();
    if (obj) {
      if (obj.year === Math.abs(year)) {
        return obj.id;
      }
    }
    return 0;
  }

  async checkReturnObj(
    month: number,
    year: number,
    returnObj?: boolean,
  ): Promise<Period> {
    const obj: Period = await this.timePeriodModel.findOne({ month }).exec();
    if (obj) {
      if (obj.year === Math.abs(year) && returnObj) {
        return obj;
      }
    }
    return null;
  }

  async findByDate(date: string): Promise<Period> {
    const dateObj = new Date(date);
    const check = await this.checkReturnID(
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
    const obj: Period = await this.timePeriodModel
      .findOne({ month: dateObj.getMonth() + 1, year: dateObj.getFullYear() })
      .exec();
    return obj;
  }

  async stopStartPeriod(monthYear: {
    month: number;
    year: number;
  }): Promise<Period> {
    const check: Period = await this.checkReturnObj(
      monthYear.month,
      monthYear.year,
      true,
    );
    if (check == null) {
      let newTimesheet: [Timesheet];
      const newPeriodStarting: PeriodDto = {
        finished: false,
        year: monthYear.year,
        month: monthYear.month,
        timeslots: newTimesheet,
      };
      const createdTimesheet = new this.timePeriodModel(newPeriodStarting);
      await createdTimesheet.save();
      return createdTimesheet;
    } else if (check) {
      const updatedPeriod = this.timePeriodModel.findOneAndUpdate(
        { _id: check._id },
        { $set: { finished: !check.finished } },
        { new: true },
      );
      return updatedPeriod;
    } else {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'UnExpected Error!',
      });
    }
  }

  badRequest() {
    throw new BadRequestException({
      statusCode: 400,
      error: 'Bad Request',
      message: 'A similar timeslot was found',
    });
  }
}
