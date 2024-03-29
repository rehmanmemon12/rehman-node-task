import {DataTypes, Model} from 'sequelize';

import sequelize from "@/loaders/sequilize";
import User from "@/models/user";

class Posts extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Posts',
    }
);

Posts.belongsTo(User, {foreignKey: 'userId', as: 'user'});

export default Posts;
