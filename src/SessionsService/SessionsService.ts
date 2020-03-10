export const getAllSessions = async (repo) => {
  const sessions = await repo.getAllSessions();
  return formatSessions(sessions.rows);
};

const formatSessions = (rows) => {

  let sessions: object[] = [];

  const hasLikes = (row: object[]): boolean => {
    return row[11] !== null;
  };

  for (let i = 0; i < rows.length; i++) {
    const likes = hasLikes(rows[i]) ? rows[i].slice(12) : [];

    sessions.push(
        {
          id: rows[i][0],
          title: rows[i][3],
          location: {
            id: rows[i][6],
            name: rows[i][10],
            description: rows[i][7],
            location: rows[i][9],
            facilities: rows[i][8]
          },
          time: rows[i][2],
          presenter: rows[i][1],
          type: rows[i][4],
          likes: likes
        }
    )
  }
  return sessions;
};
