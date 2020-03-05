// @ts-ignore
import * as chai from 'chai';

import {getAllSessions, hello, helloAgain} from './handler';

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

  //TODO: Mock database and unit test get all sessions

  describe("Get all sessions", () => {
    it("should return all sessions",  async() => {
      await getAllSessions(null, null, (error: Error, result: any) => {
        expect(error).to.be.null;
        result.body.should.equal('{"message":{"names":["id","presenter","time","title","type","location_id"],"rows":[["48n","Andrei","19:25","Kitchen Session","Round Table","3n"],["49n","Matt","00:00","Matts Test","Practical","1n"],["50n","Sherlock","12:12","Sherlock\'s test","Workshop","6n"],["51n","Matt","15:15","Matt\'s other test","Round Table","11n"]],"status":"SELECT 4"},"input":null}');
      })
    });
  });
});
