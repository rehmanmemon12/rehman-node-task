import { Model, DataTypes } from 'sequelize';
import sequelize from "@/loaders/sequilize";

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public role!: string;
    public password!: string;

    // Timestamp fields
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password:{
          type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);


export default User;
