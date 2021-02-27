import { Doc, get, group, response, route, param, post, del, put } from "doctopus";
import IRoom from "./room.interface";
import Room from "./room.model";
import m2s from "mongoose-to-swagger";

@group("Room")
export class RoomController {
  @get
  @route("/api/room")
  @response({
    description: "GET - all rooms",
    schema: Doc.arrayOf(Doc.object(m2s(Room))),
  })
  async getAllAsync() {
    return Room.find({});
  }

  @get
  @route("/api/room/{roomNumber}")
  @param({
    in: "query",
    name: "roomNumber",
    type: "number",
  })
  @response({
    description: "GET - room by number",
    schema: Doc.object(m2s(Room)),
  })
  async getByNumberAsync(roomNumber: number) {
    return Room.findOne({ roomNumber: roomNumber });
  }

  @post
  @route("/api/room")
  @param({
    in: "body",
    name: "Room",
    schema: Doc.object({
      example: {
        roomNumber: 123,
        isReserved: false,
        hotelId: "hotelId",
      },
    }),
  })
  @response({
    description: "POST - create a room",
    schema: Doc.object(m2s(Room))
  })
  async createAsync(room: IRoom) {
    const RoomExists = await Room.findOne({ roomNumber: room.roomNumber });

    if (RoomExists != null) {
      throw new Error("A Room with that name already exists");
    }

    return Room.create(room);
  }

  @del
  @route("/api/room/{roomNumber}")
  @param({
    in: "query",
    name: "roomNumber",
    type: "number",
  })
  @response({
    description: "DELETE - delete a room by number",
    schema: Doc.object(m2s(Room)),
  })
  async deleteByNumberAsync(roomNumber: number) {
    return Room.deleteOne({ roomNumber: roomNumber });
  }

  @put
  @route("/api/room/reserve/{roomNumber}")
  @param({
    in: "query",
    name: "roomNumber",
    type: "number",
  })
  @response({
    description: "PUT - reserve a room by number",
    schema: Doc.object(m2s(Room))
  })
  async reserveRoomByNumber(roomNumber: number) {
    const room = await Room.findOne({ roomNumber: roomNumber });
    if (room == null || room.isReserved) {
      throw new Error("Room already reserved");
    }
    return Room.updateOne({ roomNumber: roomNumber }, { isReserved: true });
  }

  @get
  @route("/api/room/available/{hotelId}")
  @param({
    in: "query",
    name: "hotelId",
    type: "string",
  })
  @response({
    description: "GET - get available rooms by hotel id",
    schema: Doc.arrayOf(Doc.object(m2s(Room)))
  })
  async getAvailableRoomsByHotelId(hotelId: string) {
    return Room.find({ hotelId: hotelId, isReserved: false });
  }
}

export default new RoomController();
