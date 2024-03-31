import { Model } from "sequelize";
export default class Store extends Model {
    id: string;
    name: string;
    storeImageUrl?: string;
    description: string;
    createdBy?: string;
    createdDt?: Date;
    updatedBy?: string;
    updatedDt?: Date;
    deletedDt?: Date;
}
