import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetController } from './timesheet.controller';

describe('Timesheet Controller', () => {
  let controller: TimesheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimesheetController],
    }).compile();

    controller = module.get<TimesheetController>(TimesheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
