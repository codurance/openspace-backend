import {getAllSessions} from "./SessionsService";
import SessionsRepository from "../SessionsRepository/SessionsRepository";
import {instance, mock, verify, when} from "ts-mockito";

describe("getAllSessions", () => {

  const repositoryMock = mock<SessionsRepository>();
  const repositoryMockInstance = instance(repositoryMock);

  it("should call SessionsRepository to get all sessions", () => {
    getAllSessions(repositoryMockInstance);
    verify(repositoryMock.getAllSessions()).called();
  });

  it("should return sessions in the correct format", async () => {
    const mockResult = [
      {
        id: 1,
        presenter: 'Matt',
        time: '12:12',
        title: 'Matts Test',
        type: 'Demo',
        location_id: 1,
        description: 'Small Meeting Room',
        facilities: 'TV, Chromecast',
        location: '3rd Floor, London Office',
        name: 'Small Meeting Room',
        session_id: 1,
        likes: 'jo.bloggs@codurance.com'
      },
      {
        id: 2,
        presenter: 'Andrei',
        time: '13:13',
        title: 'Andreis Test',
        type: 'Practical',
        location_id: 2,
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
        "id": 1, "title": "Matts Test",
        "location": {
          "id": 1,
          "name": "Small Meeting Room",
          "description": "Small Meeting Room",
          "location": "3rd Floor, London Office",
          "facilities": "TV, Chromecast"
        },
        "time": "12:12",
        "presenter": "Matt",
        "type": "Demo",
        "likes": ["jo.bloggs@codurance.com"]
      },
      {
        "id": 2,
        "title": "Andreis Test",
        "location": {
          "id": 2,
          "name": "Kitchen",
          "description": "Kitchen on 3rd floor",
          "location": "3rd Floor, London Office",
          "facilities": "TV, WiFi, Tables, Chromecast, HDMI"
        },
        "time": "13:13",
        "presenter": "Andrei",
        "type": "Practical",
        "likes": []
      }
    ];

    expect(await getAllSessions(repositoryMockInstance)).toStrictEqual(expectedResult);

  });
});
