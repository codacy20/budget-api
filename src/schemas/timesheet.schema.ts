import * as mongoose from 'mongoose';

export const TimesheetSchema = new mongoose.Schema({
    hours: Number,
    date: Date,
    category: String,
});
