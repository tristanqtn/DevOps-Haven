const app = require("../src/index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const db = require("../src/dbClient");

chai.use(chaiHttp);

describe("User REST API", () => {
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb();
  });

  after(() => {
    app.close();
    db.quit();
  });

  describe("POST /user", () => {
    it("create a new user", () => {
      const user = {
        username: "sergkudinov",
        firstname: "Sergei",
        lastname: "Kudinov",
      };
      chai
        .request(app)
        .post("/user")
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body.status).to.equal("success");
          chai.expect(res).to.be.json;
        })
        .catch((err) => {
          throw err;
        });
    });

    it("pass wrong parameters", (done) => {
      const user = {
        firstname: "Sergei",
        lastname: "Kudinov",
      };
      chai
        .request(app)
        .post("/user")
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body.status).to.equal("error");
          chai.expect(res).to.be.json;
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  }).timeout(20000);

  describe("GET /user", () => {
    //   // TODO Create test for the get method
    it("create a new user", () => {
      const user = {
        username: "sergkudinov",
        firstname: "Sergei",
        lastname: "Kudinov",
      };
      chai
        .request(app)
        .post("/user")
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body.status).to.equal("success");
          chai.expect(res).to.be.json;
        })
        .catch((err) => {
          throw err;
        });
      chai
        .request(app)
        .get("/user")
        .send("/" + user.username)
        .then((res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body.status).to.equal("success");
          chai.expect(res.body.msg.lastname).to.equal(user.lastname);
          chai.expect(res.body.msg.firstname).to.equal(user.firstname);
          chai.expect(res).to.be.json;
        })
        .catch((err) => {
          throw err;
        });
    });

    it("pass wrong parameters", () => {
      chai
        .request(app)
        .get("/user")
        .send("/test")
        .then((res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body.status).to.equal("error");
          chai.expect(res).to.be.json;
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});
