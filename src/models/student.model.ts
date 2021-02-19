import * as mongoose from 'mongoose';
import IStudent from '../interfaces/student.interface';

const studentSchema = new mongoose.Schema({
    name: String,
    grade: Number,
});

const Student = mongoose.model<IStudent & mongoose.Document>('Student', studentSchema);

export default Student;