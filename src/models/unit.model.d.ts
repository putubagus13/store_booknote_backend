import { Model } from "sequelize";
export default class Unit extends Model {
    id: string;
    name: string;
    description?: string;
    createdBy?: string;
    createdDt?: Date;
    updatedBy?: string;
    updatedDt?: Date;
    deletedDt?: Date;
}
