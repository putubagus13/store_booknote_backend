import { Model } from "sequelize";
export declare class UserPassword extends Model {
    id: string;
    userId: string;
    hashPassword: string;
    createdBy?: string;
    createdDt: Date;
    updatedBy?: string;
    updatedDt?: Date;
    deletedDt?: Date;
}
