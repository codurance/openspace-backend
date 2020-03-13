import SessionsRepository from "./SessionsRepository";

let sessionsRepository: SessionsRepository;

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
    const result = await sessionsRepository.addSession({
      presenter: "Tester",
      time: "15:30",
      title: "Test",
      type: "Round Table",
      location_id: 11
    });
    const addedSession = result[0];

    expect(addedSession.title).toBe("Test");

    await sessionsRepository.deleteSession(result[0].id);
  })
});

describe("editSession", () => {
  test("should edit a session", async () => {
    const addedSession = await sessionsRepository.addSession({
      presenter: "Tester",
      time: "15:30",
      title: "Test",
      type: "Round Table",
      location_id: 11
    });

    const expectedResult = [{
      id: addedSession[0].id,
      presenter: "Tester2",
      time: "12:00",
      title: "Test2",
      type: "Demo",
      location_id: "5"
    }];

    const editedFields = await sessionsRepository.editSession(addedSession[0].id, {
      presenter: "Tester2",
      time: "12:00",
      title: "Test2",
      type: "Demo",
      location_id: 5
    });

    expect(editedFields).toStrictEqual(expectedResult);
  })
});

describe("deleteSession", () => {
  test("should delete a session", async () => {
    const addedSession = await sessionsRepository.addSession({
      presenter: "Tester",
      time: "15:30",
      title: "Test",
      type: "Round Table",
      location_id: 11
    });
    const sessionId = addedSession[0].id;

    const result = await sessionsRepository.deleteSession(sessionId);

    expect(result[0].id).toStrictEqual(sessionId.toString());
  })
});
