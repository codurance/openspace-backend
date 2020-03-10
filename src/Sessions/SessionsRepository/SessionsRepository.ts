import {Client} from "ts-postgres";
import {config} from "dotenv";

config();

export type SessionsResult = {
  names: string[],
  rows: any
}

class SessionsRepository {

  client = new Client({
    host: process.env.PROD_DB_URI,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWD,
    port: Number(process.env.PROD_DB_PORT),
    database: process.env.PROD_DB_NAME
  });

  async getAllSessions(): Promise<SessionsResult> {

    await this.client.connect();

    try {
      const postgresResult = await this.client.query(`
          SELECT *
          FROM sessions
                   LEFT JOIN spaces s on sessions.location_id = s.id
                   LEFT JOIN session_likes sl on sessions.id = sl.session_id

      `);

      return {
        names: postgresResult.names,
        rows: postgresResult.rows
      };
    } finally {
      await this.client.end();
    }
  }

  async editSessions() {

    await this.client.connect();

    try {
      this.client.query(`
          UPDATE sessions
          SET time = '12:12' where sessions.id = 53
           `);
    } finally {
      await this.client.end();
    }
  }
}

export default SessionsRepository
