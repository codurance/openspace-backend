import {Pool, PoolClient} from "pg";
import {config} from "dotenv";

config();

const createPool = (): Pool => {
  return new Pool({
    host: process.env.PROD_DB_URI,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWD,
    database: process.env.PROD_DB_NAME,
    port: Number(process.env.DB_PORT)
  });
};

const connect = async (pool: Pool): Promise<PoolClient> => {
  pool.on("error", (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1)
  });
  return await pool.connect();
};

const endPool = async (client: PoolClient, pool: Pool) => {
  client.release();
  await pool.end();
};

class SessionsRepository {

  getAllSessions = async () => {
    const pool = createPool();
    const client = await connect(pool);

    try {
      const result = await client.query(`
          SELECT sessions.id as sessionid, *
          FROM sessions
                   JOIN spaces s on sessions.location_id = s.id
                   lEFT JOIN session_likes sl on sessions.id = sl.session_id`);
      return result.rows;
    } catch (e) {
      throw e
    } finally {
      await endPool(client, pool);
    }
  };

  addSession = async (session) => {
    const pool = createPool();
    const client = await connect(pool);

    const {presenter, time, title, type, location_id} = session;

    try {
      const result = await client.query(`
                  INSERT into sessions (presenter, time, title, type, location_id)
                  VALUES ($1, $2, $3, $4, $5)
                  RETURNING *`,
          [presenter, time, title, type, location_id]);
      return result.rows;
    } catch (e) {
      throw e
    } finally {
      await endPool(client, pool);
    }
  };

  editSession = async (id: number) => {
    const pool = createPool();
    const client = await connect(pool);

    try {
      const result = await client.query(`
                  UPDATE sessions
                  SET time = '13:30'
                  WHERE sessions.id = $1
                  RETURNING sessions.time`,
          [id]);
      return result.rows;
    } catch (e) {
      throw e
    } finally {
      await endPool(client, pool);
    }
  };

  deleteSession = async (id: number) => {
    const pool = createPool();
    const client = await connect(pool);

    try {
      const result = await client.query(`
                  DELETE
                  from sessions
                  WHERE sessions.id = $1
                  RETURNING *`,
          [id]);
      return result.rows;
    } catch (e) {
      throw e
    } finally {
      await endPool(client, pool);
    }
  }
}

export default SessionsRepository
