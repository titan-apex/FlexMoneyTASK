import { connectMySQL } from "./mysql";

const conn = await connectMySQL();

await conn.execute(
  `CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)`
);
