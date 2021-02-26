import * as mongoose from "mongoose";
import IRoom from "./room.interface";

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,
        required: true,
    },
    isReserved: {
        type: Boolean,
        required: true,
    },
    hotelId:{
        type: String, 
        required:true
    }
});

const Room = mongoose.model<IRoom & mongoose.Document>("Room", roomSchema);

export default Room;
