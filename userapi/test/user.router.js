const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/index");
const db = require("../src/dbClient");
const userController = require("../src/controllers/user");

chai.use(chaiHttp);

describe("User REST API", () => {
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb();
  });

  after(() => {
    db.flushdb();
    app.close();
    db.quit();
  });

  describe("POST /user", () => {
    it("create a new user", (done) => {
      const user = {
        username: "tristanqtn",
        firstname: "tristan",
        lastname: "querton",
      };
      chai
        .request(app)
        .post("/user")
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body.status).to.equal("success");
          chai.expect(res).to.be.json;
          done();
        })
        .catch((err) => {
          throw err;
        });
    });

    it("pass wrong parameters", (done) => {
      const user = {
        firstname: "tristan",
        lastname: "querton",
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
  });

  describe("GET /user", () => {
    it("get an existing user", (done) => {
      const user = {
        username: "tristanqtn",
        firstname: "tristan",
        lastname: "querton",
      };
      // Create a user
      userController.create(user, () => {
        // Get the user
        chai
          .request(app)
          .get("/user/" + user.username)
          .then((res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body.status).to.equal("success");
            chai.expect(res.body.msg.firstname).to.equal(user.firstname);
            chai.expect(res.body.msg.lastname).to.equal(user.lastname);
            chai.expect(res).to.be.json;
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
    });

    it("can not get a user when it does not exist", (done) => {
      chai
        .request(app)
        .get("/user/invalid")
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
  });
  describe("GET /user/keys", () => {
    it("get the key of an existing user", (done) => {
      const user = {
        username: "tristanqtn",
        firstname: "tristan",
        lastname: "querton",
      };
      // Create a user
      userController.create(user, () => {
        // Get the user
        chai
          .request(app)
          .get("/user/keys")
          .then((res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body.status).to.equal("success");
            chai.expect(res.body.msg[0]).to.equal(user.username);
            chai.expect(res).to.be.json;
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  });
  describe("Delete /user", () => {
    it("delete an existing user", (done) => {
      const user = {
        username: "tristanqtn",
        firstname: "tristan",
        lastname: "querton",
      };
      // Create a user
      userController.create(user, () => {
        // Get the user
        chai
          .request(app)
          .delete("/user/" + user.username)
          .then((res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body.status).to.equal("success");
            chai.expect(res.body.msg).to.equal(1);
            chai.expect(res).to.be.json;
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  });
});
