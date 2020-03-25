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

export const updateLike = async (repo: SessionsRepository, id: number, email: string) => {
  const session = await repo.getSessionById(id)[0];
  return session.likes === null || !session.likes.includes(email)
      ? await repo.addLike(id, email)
      : await repo.deleteLike(id)
};

const numberOf = (sessions: {}[]): number => {
  return sessions === null ? 0 : sessions.length;
};

const formatSessions = (sessions: {}[]) => {

  const formattedSessions: {}[] = [];

  for (let i = 0; i < numberOf(sessions); i++) {

    const likes = () => {
      return sessions[i]["likes"] !== null
          ? [sessions[i]["likes"]]
          : []
    };

    formattedSessions.push({
      id: parseInt(sessions[i]["sessionid"]),
      title: sessions[i]["title"],
      location: {
        id: parseInt(sessions[i]["location_id"]),
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
