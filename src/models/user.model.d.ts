import { Model } from "sequelize";
export default class User extends Model {
    userId: string;
    fullname?: string;
    imageUrl?: string;
    phoneNumber?: number;
    email?: string;
    createdBy?: string;
    createdDt?: Date;
    updatedBy?: string;
    updatedDt?: Date;
    deletedDt?: Date;
}
