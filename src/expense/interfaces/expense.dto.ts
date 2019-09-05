import { Document } from 'mongoose';

export interface Expense extends Document {
  name: string;
  price: number;
  location: string;
  date: Date;
  category: string;
  vat: boolean;
}
