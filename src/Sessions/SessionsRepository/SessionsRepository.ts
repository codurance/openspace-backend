import {Client} from "pg";
import {config} from "dotenv";

config();

class SessionsRepository {

  client = new Client({
    host: process.env.PROD_DB_URI,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWD,
    port: Number(process.env.PROD_DB_PORT),
    database: process.env.PROD_DB_NAME
  });

  async getAllSessions(): Promise<object[]> {

    await this.client.connect();

    try {
      const result = await this.client
          .query(`
              SELECT *
              FROM sessions
                       LEFT JOIN spaces s on sessions.location_id = s.id
                       LEFT JOIN session_likes sl on sessions.id = sl.session_id`);

      return result.rows;
    } catch (e) {
      console.log(e.stack)
    } finally {
      await this.client.end();
    }
  }

  //TODO: Mock the database using CREATE TEMPORARY TABLE:
  // https://medium.com/geoblinktech/testing-postgres-application-one-simple-trick-eec587cd964

  async editSession(id: number) {

    const result = await this.client.connect();

    try {
      await this.client.query(`
                  UPDATE sessions
                  SET time = '12:30'
                  WHERE sessions.id = $1
                  RETURNING sessions.time`,
          [id]);
      console.log(result);
      return result;
    } catch (e) {
      console.log(e.stack)
    } finally {
      await this.client.end();
    }
  }
}

export default SessionsRepository
