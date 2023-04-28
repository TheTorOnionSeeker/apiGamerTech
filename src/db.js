require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/conntech`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
//const { User, Education, Role, Vacant, Experience, Type, Postulation } = sequelize.models;
// Aca vendrian las relaciones

// Un usuario tiene unicamente un role y una rol le puede corresponder de 0 a muchos usuarios

/* Role.hasOne(User);
User.belongsTo(Role); */

// Un usuario posee a 0 o más estudios y una estudio posee de 0 a muchos usuarios

/* User.belongsToMany(Education, {through: 'EducationUser'});
Education.belongsToMany(User, {through: 'EducationUser'}); */

// Una vacante ocupas 1 trabajo y un trabajo ocupas de 0 a muchas vacantes

/* Experience.hasOne(User);
User.belongsTo(Experience);

Education.hasOne(User);
User.belongsTo(Education);

Type.hasOne(Experience)
Experience.belongsTo(Type);

Type.hasOne(Vacant);
Vacant.belongsTo(Type); */

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};