import {Client} from "ts-postgres";

const dotenv = require('dotenv');
dotenv.config();

export const getAllSessions = async () => {

  const client = new Client({
    host: process.env.PROD_DB_URI,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWD,
    port: Number(process.env.PROD_DB_PORT),
    database: process.env.PROD_DB_NAME
  });

  await client.connect();

  try {
    return await client.query(`SELECT * FROM sessions`);

  } finally {
    await client.end();
  }
};

