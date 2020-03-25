import {Pool, PoolClient} from "pg";
import {config} from "dotenv";

config();

export const createPool = (): Pool => {
  return new Pool({
    host: process.env.PROD_DB_URI,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWD,
    database: process.env.PROD_DB_NAME,
    port: Number(process.env.DB_PORT)
  });
};

export const connect = async (pool: Pool): Promise<PoolClient> => {
  pool.on("error", (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1)
  });
  return await pool.connect();
};

export const endPool = async (client: PoolClient, pool: Pool) => {
  client.release();
  await pool.end();
};

