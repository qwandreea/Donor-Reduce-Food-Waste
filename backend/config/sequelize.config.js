const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: console.log,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model")(sequelize, Sequelize);
db.business_users = require("../models/business.user.model")(sequelize,Sequelize);
db.categories = require("../models/categories.model")(sequelize,Sequelize);
db.adrese = require("../models/adrese.model")(sequelize,Sequelize);
db.produse_categorii = require ("../models/produse.categorii.model")(sequelize,Sequelize);
db.food_listing =  require ("../models/food.listing.model")(sequelize,Sequelize);
db.volunteer_users = require ("../models/volunteer.user.model")(sequelize,Sequelize);
db.items_rezervate = require ("../models/produse_rezervate.model")(sequelize,Sequelize);
db.cereri_produse = require ("../models/cerere_produse.model")(sequelize,Sequelize);
db.reviews = require ("../models/reviews.model")(sequelize,Sequelize);

//model relationships
db.users.hasOne(db.business_users,{as: 'business_users',foreignKey: 'user_id_fk'})
db.users.hasOne(db.volunteer_users,{as: 'volunteer_users',foreignKey: 'user_id_fk'})
db.users.hasMany(db.adrese,{as: 'adrese',foreignKey: 'user_id_fk'})
db.users.hasMany(db.food_listing,{as: 'food_listing',foreignKey: 'user_id_fk'})
db.users.hasMany(db.items_rezervate, {as: 'items_rezervate_user', foreignKey: 'user_id_fk'})
db.users.hasMany(db.reviews, {as: 'user_reviews', foreignKey: 'user_id_fk'})

db.business_users.belongsTo(db.users, {as: 'business_users',foreignKey: 'user_id_fk'})
db.business_users.hasMany(db.cereri_produse, {as: 'cereri_produse_business',foreignKey:'buser_id_fk'})
db.volunteer_users.belongsTo(db.users, {as: "volunteer_users", foreignKey: 'user_id_fk'})
db.volunteer_users.hasMany(db.cereri_produse, {as: 'cereri_produse_volunteer',foreignKey:'volunteer_id_fk'})

db.food_listing.hasMany(db.produse_categorii,{as: 'food_listing_category',foreignKey: 'food_listing_id_fk'})
db.food_listing.belongsTo(db.adrese,{as: 'food_listing_add',foreignKey: 'adress_pickup_id'})
db.food_listing.belongsTo(db.users,{as: 'food_listing',foreignKey: 'user_id_fk'})
db.food_listing.hasMany(db.items_rezervate, {as: 'items_rezervate_items', foreignKey: 'item_id_fk'})
db.food_listing.hasMany(db.cereri_produse, {as: 'items_cereri_produse', foreignKey: 'item_id_fk'})

db.categories.hasMany(db.produse_categorii, {as: 'categories_category',foreignKey: 'category_id_fk'})

db.produse_categorii.belongsTo(db.food_listing,{as: 'food_listing_category',foreignKey: 'food_listing_id_fk'})
db.produse_categorii.belongsTo(db.categories,{as: 'categories_category',foreignKey: 'category_id_fk'})

db.adrese.belongsTo(db.users,{as: 'adrese',foreignKey: 'user_id_fk'})
db.adrese.hasMany(db.food_listing,{as:'food_listing_add', foreignKey: 'adress_pickup_id'})

db.items_rezervate.belongsTo(db.food_listing, {as: 'items_rezervate_items', foreignKey: 'item_id_fk'})
db.items_rezervate.belongsTo(db.users, {as: 'items_rezervate_user', foreignKey: 'user_id_fk'})

db.cereri_produse.belongsTo(db.business_users, {as: 'cereri_produse_business',foreignKey:'buser_id_fk'})
db.cereri_produse.belongsTo(db.volunteer_users, {as: 'cereri_produse_volunteer',foreignKey:'volunteer_id_fk'})
db.cereri_produse.belongsTo(db.food_listing,  {as: 'items_cereri_produse', foreignKey: 'item_id_fk'})

db.reviews.belongsTo(db.users, {as: 'user_reviews', foreignKey: 'user_id_fk'})


module.exports = db;
//2. Add Model to the configuration