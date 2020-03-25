import {connect, createPool, endPool} from "../Connection/ConnectionService";

export const query = async (query: string, values) => {
  const pool = createPool();
  const client = await connect(pool);
  try {
    const result = await client.query(query, values);
    return result.rows;
  } catch (e) {
    throw e
  } finally {
    await endPool(client, pool);
  }
};

class SpacesRepository {
  getAllSpaces = async () => {
    return query(`SELECT * FROM spaces`,[])
  }
}

export default SpacesRepository