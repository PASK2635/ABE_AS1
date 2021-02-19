import IHotel from "./hotel.interface";
import Hotel from "./hotel.model";


class HotelController {
    async create(hotel:IHotel){
        return await Hotel.create(hotel);
    }

    async getAll(){
        return await Hotel.find({});
    }

    async getByName(hotelName:string){
        return await Hotel.findOne({name:hotelName});
    }

    async deleteByName(hotelName:string){
        return await Hotel.deleteOne({name:hotelName});

    }
}

export = new HotelController();