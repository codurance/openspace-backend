import {getAllSessions} from "./SessionsRepository";

test("should return all sessions", async () => {
  expect(await getAllSessions()).toHaveProperty("names");
});
