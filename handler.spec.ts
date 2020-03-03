// @ts-ignore
import * as chai from 'chai';
// @ts-ignore
import {hello, helloAgain} from './handler';

const expect = chai.expect;
// @ts-ignore
const should = chai.should();

describe("handler", () => {
  describe("hello", () => {
    it("should return Serverless boilerplate message", () => {
      hello(null, null, (error: Error, result: any) => {
        expect(error).to.be.null;
        result.body.should.equal('{"message":"Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!","input":null}');
      })
    });
  });

  describe("Hello again", () => {
    it("should return 'Hello again!'", () => {
      helloAgain(null, null, (error: Error, result: any) => {
        expect(error).to.be.null;
        result.body.should.equal('{"message":"Hello again!","input":null}');
      })
    });
  });
});


