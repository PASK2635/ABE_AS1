"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const hotel_model_1 = __importDefault(require("./hotel.model"));
class HotelController {
    create(hotel) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_model_1.default.create(hotel);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_model_1.default.find({});
        });
    }
    getByName(hotelName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_model_1.default.findOne({ name: hotelName });
        });
    }
    deleteByName(hotelName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_model_1.default.deleteOne({ name: hotelName });
        });
    }
}
module.exports = new HotelController();
//# sourceMappingURL=hotel.controller.js.map