import SessionsRepository from "./SessionsRepository";

test("should return all sessions from database", async () => {

  const sessionsRepository = new SessionsRepository();

  expect(await sessionsRepository.getAllSessions()).toHaveProperty("names");
});
