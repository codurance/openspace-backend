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

describe("editSessions", () => {
  test("should edit sessions", async () => {

    const expectedResult = [{time: "13:30"}];

    const result = await sessionsRepository.editSession(53);

    expect(result).toStrictEqual(expectedResult);
  })
});
