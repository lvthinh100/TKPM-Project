// *Connect to db  for later
console.log(process.env.DATABASE_PASSWORD);
module.exports = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  max: 30, // use up to 30 connections
  ssl: true,
};
