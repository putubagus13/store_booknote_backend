import { Model } from "sequelize";
export default class UserStore extends Model {
    id: string;
    userId: string;
    storeId: string;
    createdBy?: string;
    createdDt?: Date;
    updatedBy?: string;
    updatedDt?: Date;
    deletedDt?: Date;
}
