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
    return query(`SELECT *
                  FROM spaces`, [])
  };

  addSpace = async (space) => {
    const {name, description, location, facilities} = space;
    return query(`
                INSERT into spaces (name, description, location, facilities)
                VALUES ($1, $2, $3, $4)
                RETURNING *`,
        [name, description, location, facilities])
  };

  editSpace = async (id: number, space) => {
    const {name, description, location, facilities} = space;
    return query(`
                UPDATE spaces
                SET name        = $2,
                    description = $3,
                    location    = $4,
                    facilities  = $5
                WHERE spaces.id = $1
                RETURNING *`,
        [id, name, description, location, facilities])
  };

  deleteSpace = async (id: number) => {
    return query(`
                DELETE
                from spaces
                WHERE spaces.id = $1
                RETURNING *`,
        [id]);
  };
}

export default SpacesRepository