import {APIGatewayEvent, Callback, Context, Handler} from 'aws-lambda';
import SpacesRepository from "./src/SpacesRepository/SpacesRepository";

const spacesRepository = new SpacesRepository();

export const getSpaces: Handler = async (_event: APIGatewayEvent, _context: Context, cb: Callback) =>{
  const response = {
    statusCode: 200,
    body: JSON.stringify(await spacesRepository.getAllSpaces())
  };

  cb(null, response);
};

export const addASpace: Handler = async (event: APIGatewayEvent, _context: Context, cb: Callback) =>{
  const response = {
    statusCode: 200,
    body: JSON.stringify(await spacesRepository.addSpace(event))
  };

  cb(null, response);
};

export const editASpace: Handler = async (event: APIGatewayEvent, _context: Context, cb: Callback) =>{
  const response = {
    statusCode: 200,
    body: JSON.stringify(await spacesRepository.editSpace(parseInt(event.pathParameters.id), event))
  };

  cb(null, response);
};

export const deleteASpace: Handler = async (event: APIGatewayEvent, _context: Context, cb: Callback) =>{
  const result = await spacesRepository.deleteSpace(parseInt(event.pathParameters.id));

  const response = {
    statusCode: 200,
    body: JSON.stringify("Space " + result[0].id + " has been deleted")
  };

  cb(null, response);
};