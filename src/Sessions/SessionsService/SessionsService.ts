import SessionsRepository from "../SessionsRepository/SessionsRepository";

export const getAllSessions = async (repo: SessionsRepository) => {
  try {
  return formatSessions(await repo.getAllSessions());
  } catch (e) {
    console.log(e.stack);
  }
};

export const addSession = async (repo: SessionsRepository, request: {}) => {
  try {
    return await repo.addSession(request);
  } catch (e) {
    console.log(e.stack)
  }
};

const formatSessions = (sessions: {}[]) => {

  const formattedSessions: {}[] = [];

  for (let i = 0; i < sessions.length; i++) {

    const likes = () => {
      return sessions[i]["likes"] !== null
          ? [sessions[i]["likes"]]
          : []
    };

    formattedSessions.push({
      id: sessions[i]["sessionid"],
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
