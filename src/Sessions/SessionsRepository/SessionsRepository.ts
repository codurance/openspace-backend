import {Pool} from "pg";
import {config} from "dotenv";

config();

const pool = new Pool({
  host: process.env.PROD_DB_URI,
  user: process.env.PROD_DB_USER,
  password: process.env.PROD_DB_PASSWD,
  port: Number(process.env.PROD_DB_PORT),
  database: process.env.PROD_DB_NAME
});

pool.on("error", (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1)
});

class SessionsRepository {

  getAllSessions = async () => {

      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const result = await client.query(`
            SELECT sessions.id as sessionid, *
            FROM sessions
                     JOIN spaces s on sessions.location_id = s.id
                     lEFT JOIN session_likes sl on sessions.id = sl.session_id`);
        console.log(result.rows);
        return result.rows;
      } catch (e) {
        await client.query("ROLLBACK");
        throw e
      }finally {
        client.release();
        await pool.end();
      }
  };

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
