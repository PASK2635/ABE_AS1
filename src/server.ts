import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import ErrorHandler from './models/ErrorHandler';
import MasterRouter from './routers/MasterRouter';
import mongoose from "mongoose";
import Student from './models/student.model';

dotenv.config({
    path: '.env',
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
    public app = express();
    public router = MasterRouter;
}

// Initialize server app
const server = new Server();

server.app.use(express.json());
server.app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URI || 'mongodb://localhost:27017/ABE_lab2c'}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const student = new Student({ name: 'Nikolaj', grade: 7 });
student.save();

// Make server app handle any route starting with '/api'
server.app.use('/api', server.router);

// Make server app handle any error
server.app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
        status: 'error',
        statusCode: err.statusCode,
        message: err.message,
    });
});


// Make server listen on some port
((port = process.env.APP_PORT || 5000) => {
    server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();