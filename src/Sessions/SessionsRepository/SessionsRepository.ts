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

  async getAllSessions() {

    await this.client.connect();

    try {
      const postgresResult = await this.client.query(`
          SELECT *
          FROM sessions
                   LEFT JOIN spaces s on sessions.location_id = s.id
                   LEFT JOIN session_likes sl on sessions.id = sl.session_id

      `);

      return postgresResult.rows;

    } finally {
      await this.client.end();
    }
  }

  //TODO: Use node-postgres instead of ts-postgres to work with the database. Also mock the database using CREATE TEMPORARY TABLE
  // https://medium.com/geoblinktech/testing-postgres-application-one-simple-trick-eec587cd964

  // async editSession(id: number) {
  //
  //   await this.client.connect();
  //
  //   try {
  //     await this.client.query(`
  //                 UPDATE sessions
  //                 SET time = '12:50'
  //                 where sessions.id = ${id}
  //         `
  //     );
  //   } finally {
  //     await this.client.end();
  //   }
  // }
}

export default SessionsRepository
