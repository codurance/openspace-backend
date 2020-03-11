import SessionsRepository from "./SessionsRepository";

let sessionsRepository;

beforeEach(() => {
  sessionsRepository = new SessionsRepository();
});

describe("getAllSessions", () => {

  test("should return all sessions from database", async () => {

    expect(await sessionsRepository.getAllSessions()).toHaveProperty("names");
  });
});

// describe("editSessions", () => {
//
//   test("should edit sessions", async () => {
//
//     await sessionsRepository.editSession(53);
//
//     expect(await sessionsRepository.getAllSessions().rows).toBe([{a:3}]);
//   })
//
// });
