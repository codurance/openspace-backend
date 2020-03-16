import {APIGatewayEvent, Callback, Context, Handler} from 'aws-lambda';
import {getAllSessions} from "./src/Sessions/SessionsService/SessionsService";
import SessionsRepository from "./src/Sessions/SessionsRepository/SessionsRepository";

export const getSessions: Handler = async (_event: APIGatewayEvent, _context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      await getAllSessions(new SessionsRepository)
    )
  };

  cb(null, response);
};
