import SpacesRepository from "./SpacesRepository";

let spacesRepository: SpacesRepository;

beforeEach(async() =>{
  spacesRepository = new SpacesRepository;
});

describe("getAllSpaces", () => {
  test("should return all spaces from the database", async () => {
   const result = await spacesRepository.getAllSpaces();
  })
});