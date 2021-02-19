import { json } from "express";
import IStudent from "../interfaces/student.interface";
import Student from "../models/student.model";

class StudentsController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`,
        };
    }

    async getAll() {
        return await Student.find({});
    }

    async getById(id: string) {
        return await Student.findOne({ '_id': id });
    }

    async create(student: IStudent) {
        return await Student.create(student);
    }
}

export = new StudentsController();