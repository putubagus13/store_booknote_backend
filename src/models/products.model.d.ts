import { Model } from "sequelize";
export default class Products extends Model {
    id: string;
    productName: string;
    quantity: number;
    price: number;
    description: string;
    categoryId: string;
    unitId: string;
    createdBy?: string;
    createdDt?: Date;
    updatedBy?: string;
    updatedDt?: Date;
    deletedDt?: Date;
}
