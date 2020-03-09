import {hello, helloAgain} from './handler';

test("should return Serverless boilerplate message", () => {
  hello(null, null, (error: Error, result: any) => {
    expect(error).toBe(null);
    expect(result.body).toBe('{"message":"Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!","input":null}');
  })
});

test("should return 'Hello again!'", () => {
  helloAgain(null, null, (error: Error, result: any) => {
    expect(error).toBe(null);
    expect(result.body).toBe('{"message":"Hello again!","input":null}');
  })
});