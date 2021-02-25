/// <reference types="mongoose" />
import IHotel from "./hotel.interface";
declare class HotelController {
    create(hotel: IHotel): Promise<IHotel & import("mongoose").Document<any>>;
    getAll(): Promise<(IHotel & import("mongoose").Document<any>)[]>;
    getByName(hotelName: string): Promise<(IHotel & import("mongoose").Document<any>) | null>;
    deleteByName(hotelName: string): Promise<any>;
}
declare const _default: HotelController;
export = _default;
