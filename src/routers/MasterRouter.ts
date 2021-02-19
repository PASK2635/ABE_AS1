import { Router } from 'express';
import StudentsRouter from './students/StudentsRouter';

class MasterRouter {
    private _router = Router();
    private _studentsRouter = StudentsRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.use('/students', this._studentsRouter);
    }
}

export = new MasterRouter().router;