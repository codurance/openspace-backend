import {addSession, getAllSessions} from "./SessionsService";
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

  it("should call SessionsRepository to get all sessions", () => {
    getAllSessions(repositoryMockInstance);
    verify(repositoryMock.getAllSessions()).called();
  });

  it("should return sessions in the correct format", async () => {
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

  it("should add a session", () => {
    const request = {presenter: "Tester", time: "15:30", title: "Test", type: "Round Table", location_id: 11};

    addSession(repositoryMockInstance, request);
    verify(repositoryMock.addSession(request)).called();
  });
});
