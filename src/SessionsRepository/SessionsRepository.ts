import {Client} from "ts-postgres";
import {config} from "dotenv";

config();

export type SessionsResult = {
  names: string[],
  rows: any
}

class SessionsRepository {

  async getAllSessions(): Promise<SessionsResult> {

    const client = new Client({
      host: process.env.PROD_DB_URI,
      user: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASSWD,
      port: Number(process.env.PROD_DB_PORT),
      database: process.env.PROD_DB_NAME
    });

    await client.connect();

    try {
      const postgresResult = await client.query(`
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
      await client.end();
    }
  }
}

export default SessionsRepository
