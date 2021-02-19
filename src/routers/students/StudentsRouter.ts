import { NextFunction, Request, Response, Router } from 'express';
import StudentsController from '../../controllers/StudentsController';
import IStudent from '../../interfaces/student.interface';
import Student from '../../models/student.model';

class StudentsRouter {
    private _router = Router();
    private _controller = StudentsController;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const students: IStudent[] = await this._controller.getAll();

                res.status(200).json(students);
            } catch (error) {
                next(error);
            }
        });

        this._router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const student = await this._controller.getById(req.params.id);

                res.status(200).json(student);
            } catch (error) {
                next(error);
            }
        });

        this._router.post('/', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const newStudent: IStudent = req.body;
                
                const createdStudent: IStudent = await this._controller.create(newStudent);
                
                res.status(201).json(createdStudent);
            } catch (error) {
                next(error);
            }
        });
    }
}

export = new StudentsRouter().router;