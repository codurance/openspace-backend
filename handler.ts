import {APIGatewayEvent, Callback, Context, Handler} from 'aws-lambda';
import {Client} from "ts-postgres";

const dotenv = require('dotenv');
dotenv.config();

export const hello: Handler = (event: APIGatewayEvent, _context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  cb(null, response);
};

export const helloAgain: Handler = (event: APIGatewayEvent, _context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello again!',
      input: event,
    }),
  };

  cb(null, response);
};

export const getAllSessions: Handler = async (event: APIGatewayEvent, _context: Context, cb: Callback) => {

  const client = new Client({
    host: process.env.PROD_DB_URI,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWD,
    port: Number(process.env.PROD_DB_PORT),
    database: process.env.PROD_DB_NAME
  });

  await client.connect();

  try {
    const result = await client.query(`SELECT * FROM sessions`);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: result,
        input: event,
      },function(_key,value) {
            if (typeof value === 'bigint') {
              return value.toString() + "n";
            } else {
              return value;
            }
          }
      )
    };

    cb(null, response);

  } finally {
    await client.end();
  }
};
