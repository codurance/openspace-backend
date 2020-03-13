import {Pool} from "pg";
import {config} from "dotenv";

config();



class SessionsRepository {

  getAllSessions = async () => {

    const pool = new Pool({
      host: process.env.PROD_DB_URI,
      user: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASSWD,
      database: process.env.PROD_DB_NAME,
      port: Number(process.env.DB_PORT)
    });

    pool.on("error", (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1)
    });

    const client = await pool.connect();
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
      client.release();
      await pool.end();
    }
  };

  addSession = async (session) => {

    const pool = new Pool({
      host: process.env.PROD_DB_URI,
      user: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASSWD,
      database: process.env.PROD_DB_NAME,
      port: Number(process.env.DB_PORT)
    });

    pool.on("error", (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1)
    });

    const {presenter, time, title, type, location_id} = session;

    const client = await pool.connect();
    try {
      const result = await client.query(`
                  INSERT into sessions (presenter, time, title, type, location_id)
                  VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [presenter, time, title, type, location_id]);
      return result.rows;
    } catch (e) {
      throw e
    } finally {
      client.release();
      await pool.end();
    }
  }

  // async editSession(id: number) {
  //
  //   this.checkForErrors();
  //   const result = await this.pool.connect();
  //
  //   try {
  //     await this.pool.query(`
  //                 UPDATE sessions
  //                 SET time = '12:30'
  //                 WHERE sessions.id = $1
  //                 RETURNING sessions.time`,
  //         [id]);
  //     console.log(result);
  //     return result;
  //   } catch (e) {
  //     console.log(e.stack)
  //   } finally {
  //     await this.pool.end();
  //   }
  // }
}

export default SessionsRepository
