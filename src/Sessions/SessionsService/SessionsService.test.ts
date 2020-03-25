import {addSession, getAllSessions, updateLike} from "./SessionsService";
import SessionsRepository from "../SessionsRepository/SessionsRepository";
import {instance, mock, verify, when} from "ts-mockito";

const getRepositoryMock = () => {
  return mock<SessionsRepository>();
};

const getRepositoryMockInstance = (mock) => {
  return instance(mock);
};

let repositoryMock;
let repositoryMockInstance;

beforeEach(() => {
  repositoryMock = getRepositoryMock();
  repositoryMockInstance = getRepositoryMockInstance(repositoryMock);
});

describe("getAllSessions", () => {

  test("should call SessionsRepository to get all sessions", () => {
    getAllSessions(repositoryMockInstance);
    verify(repositoryMock.getAllSessions()).called();
  });

  test("should return sessions in the correct format", async () => {
    const mockResult = [
      {
        sessionid: 10,
        id: 1,
        presenter: 'Test Presenter 1',
        time: '12:00',
        title: 'Test 1',
        type: 'Demo',
        location_id: 1,
        description: 'Small Meeting Room',
        facilities: 'TV, Chromecast',
        location: '3rd Floor, London Office',
        name: 'Small Meeting Room',
        session_id: 10,
        likes: 'jo.bloggs@codurance.com'
      },
      {
        sessionid: 11,
        id: 3,
        presenter: 'Test Presenter 2',
        time: '13:00',
        title: 'Test 2',
        type: 'Practical',
        location_id: 3,
        description: 'Kitchen on 3rd floor',
        facilities: 'TV, WiFi, Tables, Chromecast, HDMI',
        location: '3rd Floor, London Office',
        name: 'Kitchen',
        session_id: null,
        likes: null
      }
    ];

    when(await repositoryMock.getAllSessions()).thenReturn(mockResult);

    const expectedResult = [
      {
        "id": 10,
        "title": "Test 1",
        "location": {
          "id": 1,
          "name": "Small Meeting Room",
          "description": "Small Meeting Room",
          "location": "3rd Floor, London Office",
          "facilities": "TV, Chromecast"
        },
        "time": "12:00",
        "presenter": "Test Presenter 1",
        "type": "Demo",
        "likes": ["jo.bloggs@codurance.com"]
      },
      {
        "id": 11,
        "title": "Test 2",
        "location": {
          "id": 3,
          "name": "Kitchen",
          "description": "Kitchen on 3rd floor",
          "location": "3rd Floor, London Office",
          "facilities": "TV, WiFi, Tables, Chromecast, HDMI"
        },
        "time": "13:00",
        "presenter": "Test Presenter 2",
        "type": "Practical",
        "likes": []
      }
    ];

    expect(await getAllSessions(repositoryMockInstance)).toStrictEqual(expectedResult);

  });
});

describe("addSession", () => {

  test("should add a session", () => {
    const request = {title: "Test", spacedId: 11, time: "15:30", presenter: "Tester", type: "Round Table"};

    addSession(repositoryMockInstance, request);
    verify(repositoryMock.addSession(request)).called();
  });
});

describe("updateLike", () => {
  const session_id = 1;
  const userEmail = "testuserthree@codurance.com";

  test("should delete like if like already exists", async () => {
    when(await repositoryMock.getSessionById(session_id)).thenReturn([{
      id: session_id,
      presenter: 'Test Presenter 1',
      time: '12:00',
      title: 'Test 1',
      type: 'Demo',
      location_id: 3,
      session_id: session_id,
      likes: userEmail
    }]);

    await updateLike(repositoryMockInstance, session_id, userEmail);

    verify(repositoryMock.deleteLike(session_id)).called();
  });

  test("should add like if user has not already liked the session", async () => {
    when(await repositoryMock.getSessionById(session_id)).thenReturn([{
      id: session_id,
      presenter: 'Test Presenter 1',
      time: '12:00',
      title: 'Test 1',
      type: 'Demo',
      location_id: 3,
      session_id: session_id,
      likes: "adifferentuser@codurance.com"
    }]);

    await updateLike(repositoryMockInstance, session_id, userEmail);

    verify(repositoryMock.addLike(session_id, userEmail)).called();
  });

  test("should add like if session has no likes", async () => {
    when(await repositoryMock.getSessionById(session_id)).thenReturn([{
      id: session_id,
      presenter: 'Test Presenter 1',
      time: '12:00',
      title: 'Test 1',
      type: 'Demo',
      location_id: 3,
      session_id: null,
      likes: null
    }]);

    await updateLike(repositoryMockInstance, session_id, userEmail);

    verify(repositoryMock.addLike(session_id, userEmail)).called();
  });
});
