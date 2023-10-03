const { expect } = require("chai");
const userController = require("../src/controllers/user");
const db = require("../src/dbClient");

describe("User", () => {
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb();
  });

  describe("Create", () => {
    it("create a new user", async () => {
      const user = {
        username: "sergkudinov",
        firstname: "Sergei",
        lastname: "Kudinov",
      };
      await userController.create(user, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.be.equal("OK");
      });
    });

    it("passing wrong user parameters", async () => {
      const user = {
        firstname: "Sergei",
        lastname: "Kudinov",
      };
      await userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
      });
    });

    it("avoid creating an existing user", async () => {
      const user = {
        username: "sergkudinov",
        firstname: "Sergei",
        lastname: "Kudinov",
      };
      await userController.create(user, (err, result) => {
        expect(err).not.to.be.equal(null);
      });
    });
  });

  // TODO Create test for the get method
  describe("Get", () => {
    it("get a user by username", async () => {
      //     // 1. First, create a user to make this unit test independent from the others
      const user = {
        username: "tristanqtn",
        firstname: "Tristan",
        lastname: "Querton",
      };

      //     // 2. Then, check if the result of the get method is correct
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
      });

      await userController.get(user.username, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result.firstname).to.be.equal(user.firstname);
        expect(result.lastname).to.be.equal(user.lastname);
      });
    });
    //
    it("cannot get a user when it does not exist", async () => {
      //     // Chech with any invalid user
      //     // 1. First, create a user to make this unit test independent from the others
      const user = {
        username: "helloworld",
        firstname: "Hello",
        lastname: "World",
      };
      //     // 2. Then, check if the result of the get method is correct
      await userController.get(user.username, (err, result) => {
        expect(err).to.be.equal(null);
      });
      //
    });
  });
});
