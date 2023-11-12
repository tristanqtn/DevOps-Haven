const express = require("express");
const userController = require("../controllers/user");

const userRouter = express.Router();

userRouter

  /**
   * This function handles POST requests for the USER API.
   * @route POST /user
   * @group USER - Methods for the user API
   * @param {string} user.body.required - JSON user
   * user: {
   *    username: "sergkudinov",
   *    firstname: "Sergei",
   *    lastname: "Kudinov"
   * }
   * @examples {json} "{"username":"sergkudinov","firstname":"sergei","lastname":"kudinov"}"
   * @returns {object} 201 succes - User has been added to the REDIS db
   * @returns {Error}  400 error - User couldn't be added to REDIS db
   */
  .post("/", (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj;
      if (err) {
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(400).json(respObj);
      }
      respObj = {
        status: "success",
        msg: res,
      };
      return resp.status(201).json(respObj);
    });
  })
  /**
   * This function handles GET requests for the USER API and returns a json user if the user has been found in db
   * @route GET /user/:username
   * @group USER - Methods for the user API
   * @param {string} username.query.required - username
   * @returns {object} 201 succes - User has found in the REDIS db
   * Sends back a json user object
   * user: {
   *    username: "sergkudinov",
   *    firstname: "Sergei",
   *    lastname: "Kudinov"
   * }
   * @returns {Error}  400 error - User couldn't be found in REDIS db
   */
  .get("/:username", (req, resp, next) => {
    const username = req.params.username;
    userController.get(username, (err, res) => {
      let respObj;
      if (err) {
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(400).json(respObj);
      }
      console.log(res);
      respObj = {
        status: "success",
        msg: res,
      };
      return resp.status(201).json(respObj);
    });
  });

module.exports = userRouter;
