import {APIGatewayEvent, Callback, Context, Handler} from 'aws-lambda';
import {addSession, getAllSessions, updateLike} from "./src/Sessions/SessionsService/SessionsService";
import SessionsRepository from "./src/Sessions/SessionsRepository/SessionsRepository";

const sessionsRepository = new SessionsRepository();

export const getSessions: Handler = async (_event: APIGatewayEvent, _context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(await getAllSessions(sessionsRepository))
  };

  cb(null, response);
};

export const addASession: Handler = async (event: APIGatewayEvent, _context: Context, cb: Callback) => {

  try {
    const response = {
      statusCode: 200,
      body: JSON.stringify(await addSession(sessionsRepository, event))
    };

    cb(null, response);

  } catch (e) {
    console.log(e.stack);
    const response = {
      statusCode: 400,
      //This is only to match exactly the response from the old backend in Spring,
      //but can probably be changed to something more generic
      body: "Session type is required"
    };

    cb(null, response);
  }
};

export const deleteASession: Handler = async (event: APIGatewayEvent, _context: Context, cb: Callback) => {
  const result = await sessionsRepository.deleteSession(parseInt(event.pathParameters.id));

  const response = {
    statusCode: 200,
    body: JSON.stringify("Session " + result[0].id + " has been deleted")
  };

  cb(null, response);
};

export const editASession: Handler = async (event: APIGatewayEvent, _context: Context, cb: Callback) => {
  const response = {
    body: JSON.stringify(await sessionsRepository.editSession(parseInt(event.pathParameters.id), event))
  };

  cb(null, response);
};

export const updateALike = async (event: APIGatewayEvent, _context: Context, cb: Callback) => {
  const result = await updateLike(sessionsRepository, parseInt(event.pathParameters.id), event.pathParameters.email);

  const response = {
    body: JSON.stringify(result)
  };

  cb(null, response);
};