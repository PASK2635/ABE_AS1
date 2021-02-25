import * as mongoose from 'mongoose';
import IHotel from './hotel.interface';
declare const Hotel: mongoose.Model<IHotel & mongoose.Document<any>>;
export default Hotel;
