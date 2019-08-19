import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { Expense } from './interfaces/expense.dto';

describe('Expense Controller', () => {
  let controller: ExpenseController;
  let service: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [ExpenseService],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
    controller = module.get<ExpenseController>(ExpenseController);
  });

  it('should return an array of cats', async () => {
    const result = [
      {
        _id: '5d586db79e411e1758ddd360',
        name: 'Train to Woodwing',
        price: 50,
        location: 'Eindhoven - Zoetemeer',
        date: '2019-08-02T00:00:00.000Z',
        category: 'Business travel',
        __v: 0,
      },
    ];
    service.findAll().then(data => {
      expect(data).toBe(result);
    });
    // jest.spyOn(service, 'findAll').mockImplementation(() => result);

    // expect(await controller.findAll()).toBe(result);
  });
});
