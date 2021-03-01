import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import ErrorHandler from "./models/ErrorHandler";
import MasterRouter from "./routers/MasterRouter";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import seedAdminUser from "./utilities/seed";
import { DocBuilder } from "doctopus";
import swaggerUi from "swagger-ui-express";
import { HotelController } from "./hotel/hotel.controller"
import { AuthenticationController } from "./authentication/authentication.controller";
import { UserController } from "./user/user.controller";
import { RoomController } from "./room/room.controller";

dotenv.config({
  path: ".env",
});

class Server {
  public app = express();
  public router = MasterRouter;
}

// Initialize server app
const server = new Server();

server.app.use(bodyParser.json());
server.app.use(express.urlencoded({ extended: true }));
server.app.use(cookieParser());

const docs = new DocBuilder();

docs.set('title', 'ABE assignment 1 app');

docs.set("swagger", "2.0.0");

docs.setSecurityDefinition("Bearer", { in: "header", name: "Authorization", type: "apiKey" });

// Connect to MongoDB
mongoose.connect(
  `${process.env.MONGO_URI || "mongodb://localhost:27017/ABE_Aflevering1"}`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Seed admin user into database
seedAdminUser();

// Make server app handle any route starting with '/api'
server.app.use("/api", server.router);

// Use decorated controllers for swagger documentation
docs.use(HotelController);
docs.use(RoomController);
docs.use(AuthenticationController);
docs.use(UserController);

const swaggerDocument = docs.build();

server.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Make server app handle any error
server.app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  }
);

// Make server listen on some port
((port = process.env.APP_PORT || 3000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();
