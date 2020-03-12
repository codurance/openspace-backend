import SessionsRepository from "./SessionsRepository";
import {config} from "dotenv";
import {Pool} from "pg";

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


const mockTable = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`CREATE TEMPORARY TABLE sessions OF sessions`);
    await client.query(`INSERT INTO sessions ($blabla) VALUES ($3)`)
  }


};

let sessionsRepository;

beforeEach(async () => {
  sessionsRepository = new SessionsRepository();
  await mockTable();
});

describe("getAllSessions", () => {

  test("should return all sessions from database", async () => {

    const expectedResult = [
      {
        id: '1',
        presenter: 'Matt',
        time: '12:30',
        title: 'Matts Test',
        type: 'Demo',
        location_id: '1',
        description: 'Small Meeting Room',
        facilities: 'TV, Chromecast',
        location: '3rd Floor, London Office',
        name: 'Small Meeting Room',
        session_id: '53',
        likes: 'matthew.gray@codurance.com'
      },
      {
        id: '3',
        presenter: 'Andrei',
        time: '13:13',
        title: 'Andreis Test',
        type: 'Practical',
        location_id: '3',
        description: 'Kitchen on 3rd floor',
        facilities: 'TV, WiFi, Tables, Chromecast, HDMI',
        location: '3rd Floor, London Office',
        name: 'Kitchen',
        session_id: null,
        likes: null
      }
    ];

    expect(await sessionsRepository.getAllSessions()).toStrictEqual(expectedResult);
  });
});

// describe("editSessions", () => {
//   test("should edit sessions", async () => {
//
//     const expectedResult = [
//       {
//         id: '1',
//         presenter: 'Matt',
//         time: '12:30',
//         title: 'Matts Test',
//         type: 'Demo',
//         location_id: '1',
//         description: 'Small Meeting Room',
//         facilities: 'TV, Chromecast',
//         location: '3rd Floor, London Office',
//         name: 'Small Meeting Room',
//         session_id: '53',
//         likes: 'matthew.gray@codurance.com'
//       },
//       {
//         id: '3',
//         presenter: 'Andrei',
//         time: '13:13',
//         title: 'Andreis Test',
//         type: 'Practical',
//         location_id: '3',
//         description: 'Kitchen on 3rd floor',
//         facilities: 'TV, WiFi, Tables, Chromecast, HDMI',
//         location: '3rd Floor, London Office',
//         name: 'Kitchen',
//         session_id: null,
//         likes: null
//       }
//     ];
//
//     await sessionsRepository.editSession(53);
//
//     expect(await sessionsRepository.getAllSessions()).toStrictEqual(expectedResult);
//   })
// });
