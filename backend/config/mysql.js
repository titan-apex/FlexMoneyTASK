import mysql from "mysql2/promise";

const connectMySQL = async () => {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  return connection;
};

export { connectMySQL };
