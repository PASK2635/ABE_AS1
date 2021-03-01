export default interface IRoom extends Document {
    roomNumber: number;
    isReserved: boolean;
    hotelName: string;
}