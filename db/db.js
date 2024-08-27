// import mysql from "mysql2";

//  const dbConnection = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "anurag7587709264@#$%shukla",
//     database: "crud",
//     port: "3306"
// });


// dbConnection.connect((err) => {
//     if (err) {
//       console.error('error connecting to the database:', err.stack);
//       return;
//     }
//     console.log('connected to the database as id ' + dbConnection.threadId);
//   });

// export default dbConnection;











import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('crud', 'root', 'anurag7587709264@#$%shukla', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
