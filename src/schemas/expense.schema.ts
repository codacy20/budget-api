import * as mongoose from 'mongoose';

export const ExpenseSchema = new mongoose.Schema({
  name: String,
  price: Number,
  location: String,
  date: Date,
  category: String,
  vat: Number,
});
