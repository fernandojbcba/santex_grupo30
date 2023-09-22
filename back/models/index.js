/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.userName, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes, db);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Importar los modelos Course, Role y User como clases
const Role = require('./role')(sequelize, Sequelize.DataTypes, db);
const User = require('./user')(sequelize, Sequelize.DataTypes, db);
const Course = require('./course')(sequelize, Sequelize.DataTypes, db);
const UserRole = require('./userRole')(sequelize, Sequelize.DataTypes, db);
const UserCourse = require('./userCourse')(sequelize, Sequelize.DataTypes, db);
const UserTeacherCourse = require('./UserTeacherCourse')(sequelize, Sequelize.DataTypes, db);
const Attendance = require('./attendance')(sequelize, Sequelize.DataTypes, db);
const Status = require('./status')(sequelize, Sequelize.DataTypes, db);
const ApprovalStatus = require('./approvalStatus')(sequelize, Sequelize.DataTypes, db);
const CourseState = require('./courseState')(sequelize, Sequelize.DataTypes, db);
// Asociar los modelos Course, Role y User al objeto db
db.Role = Role;
db.User = User;
db.Course = Course;
db.UserRole = UserRole;
db.UserCourse = UserCourse;
db.UserTeacherCourse = UserTeacherCourse;
db.Attendance = Attendance;
db.Status = Status;
db.ApprovalStatus = ApprovalStatus;
db.CourseState = CourseState;
// Asociaciones entre Role, User y UserRole
Role.associate(db);
User.associate(db);
UserRole.associate(db);
UserCourse.associate(db);
UserTeacherCourse.associate(db);
Attendance.associate(db);
Status.associate(db);
ApprovalStatus.associate(db);
CourseState.associate(db);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
