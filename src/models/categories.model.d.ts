import { Model } from "sequelize";
export default class Categories extends Model {
    id: string;
    name: string;
    description?: string;
    createdBy?: string;
    createdDt?: Date;
    updatedBy?: string;
    updatedDt?: Date;
    deletedDt?: Date;
}
