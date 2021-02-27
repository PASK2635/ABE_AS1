import { Doc, get, group, param, post, response, route, del } from "doctopus";
import m2s from 'mongoose-to-swagger';
import IHotel from "./hotel.interface";
import Hotel from "./hotel.model";

@group("Hotel")
export class HotelController {
  @get
  @route("/api/hotel")
  @response({
    description: "GET - all hotels",
    schema: Doc.arrayOf(Doc.object(m2s(Hotel))),
  })
  async getAllAsync() {
    return Hotel.find({});
  }

  @get
  @route("/api/hotel/{hotelName}")
  @param({
    in: 'query',
    name: 'hotelName',
    type: 'string',
  })
  @response({
    description: "GET - hotel by name",
    schema: Doc.object(m2s(Hotel)),
  })
  async getByNameAsync(hotelName: string) {
    return Hotel.findOne({ name: hotelName });
  }

  @post
  @route("/api/hotel")
  @param({
    in: "body",
    name: "Hotel",
    schema: Doc.object({
      example: {
        name: "name",
      },
    }),
  })
  @response({
    description: "POST - create a hotel",
    schema: Doc.object(m2s(Hotel))
  })
  async createAsync(hotel: IHotel) {
    const hotelExists = await Hotel.findOne({ name: hotel.name });

    if (hotelExists != null) {
      throw new Error("A hotel with that name already exists");
    }

    return Hotel.create(hotel);
  }

  @del
  @route("/api/hotel/{hotelName}")
  @param({
    in: "query",
    name: "hotelName",
    type: "string",
  })
  @response({
    description: "DELETE - delete a hotel by name",
    schema: Doc.object(m2s(Hotel))
  })
  async deleteByNameAsync(hotelName: string) {
    return Hotel.deleteOne({ name: hotelName });
  }
}

export default new HotelController();
