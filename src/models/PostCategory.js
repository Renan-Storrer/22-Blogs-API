module.exports = (sequelize, DataTypes) => {

  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: { 
          type: DataTypes.INTEGER, 
          allowNull: false, 
      },
      categoryId: { 
          type: DataTypes.INTEGER, 
          allowNull: false ,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories'
    },
  );

  PostCategory.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      foreignKey: 'post_id',
      otherKey: 'category_id',
      through: PostCategory,
    })

    Category.belongsToMany(BlogPost, {
      as: 'posts',
      foreignKey: 'category_id',
      otherKey: 'post_id',
      through: PostCategory,
    })
  };

  return PostCategory;
};