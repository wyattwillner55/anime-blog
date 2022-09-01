const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Anime extends Model {}

Anime.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images_url: { // getAnimePictures
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    synopsis: { // getAnimeReviews
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'anime',
  }
);

module.exports = Anime;
