const { expect } = require("chai");
const userController = require("../src/controllers/user");
const db = require("../src/dbClient");

describe("User", () => {
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb();
  });

  after(() => {
    db.flushdb();
  });

  describe("Create", () => {
    it("create a new user", (done) => {
      const user = {
        username: "tristanqtn",
        firstname: "tristan",
        lastname: "querton",
      };
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.be.equal("OK");
        done();
      });
    });

    it("passing wrong user parameters", (done) => {
      const user = {
        firstname: "tristan",
        lastname: "querton",
      };
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });

    it("avoid creating an existing user", (done) => {
      const user = {
        username: "tristanqtn",
        firstname: "tristan",
        lastname: "querton",
      };
      // Create a user
      userController.create(user, () => {
        // Create the same user again
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null);
          expect(result).to.be.equal(null);
          done();
        });
      });
    });
  });

  describe("Get", () => {
    it("get a user by username", (done) => {
      const user = {
        username: "tristanqtn",
        firstname: "tristan",
        lastname: "querton",
      };
      // Create a user
      userController.create(user, () => {
        // Get an existing user
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null);
          expect(result).to.be.deep.equal({
            firstname: "tristan",
            lastname: "querton",
          });
          done();
        });
      });
    });

    it("can not get a user when it does not exist", (done) => {
      userController.get("invalid", (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });
  });
  describe("Get keys", () => {
    it("get the key of an existing user", (done) => {
      const user = {
        username: "tristanqtn",
        firstname: "tristan",
        lastname: "querton",
      };
      // Create a user
      userController.create(user, () => {
        // Get an existing user
        userController.get_all_keys((err, result) => {
          expect(err).to.be.equal(null);
          expect(result).to.be.deep.equal(["tristanqtn"]);
          done();
        });
      });
    });
  });
  describe("Delete", () => {
    it("delete an existing user", (done) => {
      const user = {
        username: "tristanqtn",
        firstname: "tristan",
        lastname: "querton",
      };
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.be.equal("OK");
        userController.delete(user.username, (err, result) => {
          expect(err).to.be.equal(null);
          expect(result).to.be.equal(1);
          done();
        });
      });
    });
    it("prevent deleting a non-existing user", (done) => {
      userController.delete("dummy", (err, result) => {
        expect(err).to.be.not.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });
  });
});
