import * as mongoose from 'mongoose';
import IHotel from '../hotel/hotel.interface';

const hotelSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
});

const Hotel = mongoose.model<IHotel & mongoose.Document>('Hotel',hotelSchema);

export default Hotel;