import SessionsRepository from "./SessionsRepository";

let sessionsRepository;

beforeEach(()=>{
    sessionsRepository = new SessionsRepository();
});

describe("Session repository", () => {

  test("should return all sessions from database", async () => {

    expect(await sessionsRepository.getAllSessions()).toHaveProperty("names");
  });
});
