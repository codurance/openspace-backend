import {connect, createPool, endPool} from "../Connection/ConnectionService";

export const query = async (query: string, values) => {
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
    const {title, location_id, time, presenter, type} = session;
    return query(`
                INSERT into sessions (title, location_id, time, presenter, type)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
        [title, location_id, time, presenter, type]);
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

  getSessionById = async (id: number) => {
    return query(`
                SELECT *
                FROM sessions
                         lEFT JOIN session_likes sl on sessions.id = sl.session_id
                WHERE sessions.id = $1`,
        [id]
    )
  };
}

export default SessionsRepository
