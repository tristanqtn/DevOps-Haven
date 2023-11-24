const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/index");

chai.use(chaiHttp);

describe("Health Endpoint", () => {
  describe("GET /health", () => {
    it("health point integrity", (done) => {
      chai
        .request(app)
        .get("/health")
        .then((res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body.status).to.equal("OK");
          chai.expect(res).to.be.json;
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});
