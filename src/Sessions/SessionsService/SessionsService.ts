export const getAllSessions = async (repo) => {

  return formatSessions(await repo.getAllSessions());
};

const formatSessions = (sessions: object[]) => {

  const formattedSessions: object[] = [];

  for (let i = 0; i < sessions.length; i++) {

    const likes = () => {
      return sessions[i]["likes"] !== null
          ? [sessions[i]["likes"]]
          : []
    };

    formattedSessions.push({
      id: sessions[i]["id"],
      title: sessions[i]["title"],
      location: {
        id: sessions[i]["location_id"],
        name: sessions[i]["name"],
        description: sessions[i]["description"],
        location: sessions[i]["location"],
        facilities: sessions[i]["facilities"]
      },
      time: sessions[i]["time"],
      presenter: sessions[i]["presenter"],
      type: sessions[i]["type"],
      likes: likes()
    })
  }
  return formattedSessions
};
