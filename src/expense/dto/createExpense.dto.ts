export class CreateExpenseDto {
  readonly name: string;
  readonly price: number;
  readonly location: string;
  readonly date: Date;
  readonly category: string;
}
