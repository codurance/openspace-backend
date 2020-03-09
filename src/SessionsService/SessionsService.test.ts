import {getAllSessions} from "./SessionsService";
import SessionsRepository from "../SessionsRepository/SessionsRepository";
import {instance, mock, verify} from "ts-mockito";

test('should call SessionsRepository to get all sessions', () => {
  const repositoryMock = mock<SessionsRepository>();
  const repositoryMockInstace = instance(repositoryMock);

  getAllSessions(repositoryMockInstace);
  verify(repositoryMock.getAllSessions()).called()
});