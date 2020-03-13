import SessionsRepository from "./SessionsRepository";

let sessionsRepository;

beforeEach(async () => {
  sessionsRepository = new SessionsRepository();
});

describe("getAllSessions", () => {
  test("should return all sessions from database", async () => {

    const result = await sessionsRepository.getAllSessions();

    expect(typeof result).toBe("object");
  });
});

describe("addSession", () => {
  test("should add session to database", async () => {

    const result = await sessionsRepository.addSession(
        {presenter: "Tester", time: "15:30", title: "Test", type: "Round Table", location_id: 11});

    const editedSession = result[0];

    expect(editedSession.title).toBe("Test");
  })
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
