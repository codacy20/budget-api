import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';

describe('Timesheet Controller', () => {
  let controller: TimesheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: TimesheetService, useValue: {} }],
      controllers: [TimesheetController],
    }).compile();

    controller = module.get<TimesheetController>(TimesheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
