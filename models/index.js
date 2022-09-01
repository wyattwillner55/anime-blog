const User = require('./User');
const Post = require('./Post');
const Anime = require('./Anime');

User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Anime.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(Anime, {
  foreignKey: 'user_id',
});

module.exports = { User, Post, Anime };
