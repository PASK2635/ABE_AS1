import IRoom from "./room.interface";
import Room from "./room.model";

class RoomController {
  async createAsync(room: IRoom) {
    const RoomExists = await Room.findOne({ roomNumber: room.roomNumber });

    if (RoomExists != null) {
      throw new Error("A Room with that name already exists");
    }

    return Room.create(room);
  }

  async getAllAsync() {
    return Room.find({});
  }

  async getByNumberAsync(roomNumber: number) {
    return Room.findOne({ roomNumber: roomNumber });
  }

  async deleteByNumberAsync(roomNumber: number) {
    return Room.deleteOne({ roomNumber: roomNumber });
  }

  async reserveRoomByNumber(roomNumber: number){
    const room = await Room.findOne({roomNumber:roomNumber});
    if(room == null || room.isReserved){
        throw new Error("Room already reserved");
    }
    return Room.updateOne({roomNumber:roomNumber},{isReserved:true});
  }

  async getAvailableRoomsByHotelId(hotelId: string){
      return Room.find({hotelId:hotelId, isReserved:false});
  }
}

export = new RoomController();
