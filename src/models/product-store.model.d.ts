import { Model } from "sequelize";
export default class ProductStore extends Model {
    id: string;
    productId: string;
    storeId: string;
    createdBy?: string;
    createdDt?: Date;
    updatedBy?: string;
    updatedDt?: Date;
    deletedDt?: Date;
}
