export const hello = (event, _context, cb) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
            input: event,
        }),
    };
    cb(null, response);
};
export const helloAgain = (event, _context, cb) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello again!',
            input: event,
        }),
    };
    cb(null, response);
};
//# sourceMappingURL=handler.js.map