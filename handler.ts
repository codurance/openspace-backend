import {APIGatewayEvent, Callback, Context, Handler} from 'aws-lambda';
import {addSession, getAllSessions} from "./src/Sessions/SessionsService/SessionsService";
import SessionsRepository from "./src/Sessions/SessionsRepository/SessionsRepository";

export const getSessions: Handler = async (_event: APIGatewayEvent, _context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(await getAllSessions(new SessionsRepository))
  };

  cb(null, response);
};

export const addASession: Handler = async (event: APIGatewayEvent, _context: Context, cb: Callback) => {

  const requestBody = JSON.parse(event.body);

  try {
    const response = {
      statusCode: 200,
      body: JSON.stringify(await addSession(new SessionsRepository, requestBody))
    };
    cb(null, response);

  } catch (e) {
    const response = {
      statusCode: 400,
      //This is only to match exactly the response from the old backend in Spring,
      //but can probably be changed to something more generic
      body: new Error("Session type is required")
    };
    cb(null, response);
  }

};
