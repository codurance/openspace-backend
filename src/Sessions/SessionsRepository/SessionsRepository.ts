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

const query = async (query: string, values) => {
  const pool = createPool();
  const client = await connect(pool);
  try {
    const result = await client.query(query, values);
    return result.rows;
  } catch (e) {
    throw e
  } finally {
    await endPool(client, pool);
  }
};

class SessionsRepository {

  getAllSessions = async () => {
    return query(`
        SELECT sessions.id as sessionid, *
        FROM sessions
                 JOIN spaces s on sessions.location_id = s.id
                 lEFT JOIN session_likes sl on sessions.id = sl.session_id`, []);
  };

  addSession = async (session) => {
    const {presenter, time, title, type, location_id} = session;
    return query(`
                INSERT into sessions (presenter, time, title, type, location_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
        [presenter, time, title, type, location_id]);
  };

  editSession = async (id: number, session) => {
    const {presenter, time, title, type, location_id} = session;
    return query(`
                UPDATE sessions
                SET presenter   = $2,
                    time        = $3,
                    title       = $4,
                    type        = $5,
                    location_id = $6
                WHERE sessions.id = $1
                RETURNING *`,
        [id, presenter, time, title, type, location_id]);
  };

  deleteSession = async (id: number) => {
    return query(`
                DELETE
                from sessions
                WHERE sessions.id = $1
                RETURNING *`,
        [id]);
  };

  addLike = async (id: number, email: string) => {
    return query(`
                INSERT into session_likes (session_id, likes)
                VALUES ($1, $2)
                RETURNING *`,
        [id, email])
  };

  deleteLike = async (id: number) => {
    return query(`
                DELETE
                FROM session_likes
                WHERE session_id = $1
                RETURNING *`,
        [id])
  };
}

export default SessionsRepository
