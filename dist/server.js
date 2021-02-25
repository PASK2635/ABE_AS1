"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const MasterRouter_1 = __importDefault(require("./routers/MasterRouter"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config({
    path: '.env',
});
/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
    constructor() {
        this.app = express_1.default();
        this.router = MasterRouter_1.default;
    }
}
// Initialize server app
const server = new Server();
server.app.use(body_parser_1.default.json());
server.app.use(express_1.default.urlencoded({ extended: true }));
server.app.use(cookie_parser_1.default());
// Connect to MongoDB
mongoose_1.default.connect(`${process.env.MONGO_URI || 'mongodb://localhost:27017/ABE_Aflevering1'}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// Make server app handle any route starting with '/api'
server.app.use('/api', server.router);
// Make server app handle any error
server.app.use((err, req, res, next) => {
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
//# sourceMappingURL=server.js.map