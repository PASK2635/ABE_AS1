import IHotel from "./hotel.interface";
import Hotel from "./hotel.model";

class HotelController {
  async createAsync(hotel: IHotel) {
    const hotelExists = await Hotel.findOne({ name: hotel.name });

    if (hotelExists != null) {
      throw new Error("A hotel with that name already exists");
    }

    return Hotel.create(hotel);
  }

  async getAllAsync() {
    return Hotel.find({});
  }

  async getByNameAsync(hotelName: string) {
    return Hotel.findOne({ name: hotelName });
  }

  async deleteByNameAsync(hotelName: string) {
    return Hotel.deleteOne({ name: hotelName });
  }
}

export = new HotelController();
