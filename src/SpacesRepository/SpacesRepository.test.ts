import SpacesRepository from "./SpacesRepository";

let spacesRepository: SpacesRepository;

beforeEach(async () => {
  spacesRepository = new SpacesRepository;
});

describe("getAllSpaces", () => {
  test("should return all spaces from the database", async () => {
    const result = await spacesRepository.getAllSpaces();

    expect(typeof result).toBe("object");
  });
});

describe("addSpace", () => {
  test("should add space to database", async () => {
    const addedSpace = await spacesRepository.addSpace({
      name: "Test room",
      description: "room for testing",
      location: "Test room valley",
      facilities: "TV, Microwave, Playstation 5"
    });

    const expectedResult = {
      id: addedSpace[0].id,
      name: "Test room",
      description: "room for testing",
      location: "Test room valley",
      facilities: "TV, Microwave, Playstation 5"
    };

    expect(addedSpace[0]).toStrictEqual(expectedResult);

    await spacesRepository.deleteSpace(addedSpace[0].id)
  });
});

describe("editSpace", () => {
  test("should edit a space", async () => {
    const addedSpace = await spacesRepository.addSpace({
      name: "Test room",
      description: "another room for testing",
      location: "Test room mountain",
      facilities: "Cooker, microwave, swimming pool"
    });

    const expectedResult = [{
      id: addedSpace[0].id,
      name: "Edited Test room",
      description: "Edited room for testing",
      location: "Edited Test room valley",
      facilities: "Edited TV, Microwave, Playstation 5"
    }];

    const editedFields = await spacesRepository.editSpace(addedSpace[0].id, {
      name: "Edited Test room",
      description: "Edited room for testing",
      location: "Edited Test room valley",
      facilities: "Edited TV, Microwave, Playstation 5"
    });

    expect(editedFields).toStrictEqual(expectedResult);

    await spacesRepository.deleteSpace(editedFields[0].id);
  })
});

describe("deleteSpace", () => {
  test("should delete space from database", async () => {
    const addedSpace = await spacesRepository.addSpace({
      name: "Test room",
      description: "room for testing",
      location: "Test room valley",
      facilities: "TV, Microwave, Playstation 5"
    });

    const result = await spacesRepository.deleteSpace(addedSpace[0].id);

    expect(result[0].id).toStrictEqual(addedSpace[0].id);
  });
});
