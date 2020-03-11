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
    const mockResult = {
      names: [
        'id', 'presenter',
        'time', 'title',
        'type', 'location_id',
        'id', 'description',
        'facilities', 'location',
        'name', 'session_id',
        'likes'
      ],
      rows: [
        [
          1,
          'Matt',
          '12:12',
          'Matts Test',
          'Demo',
          1,
          1,
          'Small Meeting Room',
          'TV, Chromecast',
          '3rd Floor, London Office',
          'Small Meeting Room',
          100,
          'jo.bloggs@codurance.com'
        ],
        [
          2,
          'Andrei',
          '13:13',
          'Andreis Test',
          'Practical',
          3,
          3,
          'Kitchen on 3rd floor',
          'TV, WiFi, Tables, Chromecast, HDMI',
          '3rd Floor, London Office',
          'Kitchen',
          null,
          null
        ]
      ]
    };
    when(repositoryMock.getAllSessions()).thenResolve(mockResult);

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
        "type": "Demo", "likes": [
          "jo.bloggs@codurance.com"
        ]
      },
      {
        "id": 2,
        "title": "Andreis Test",
        "location": {
          "id": 3,
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

// describe("editSession", () => {
//   it("should edit a session", async () => {
//
//     const repo = new SessionsRepository();
//
//     expect(await repo.editSessions(53)).toBe("a");
//   })
// });
