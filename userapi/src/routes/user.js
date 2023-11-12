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
   *    username: "tristanqtn",
   *    firstname: "tristan",
   *    lastname: "querton"
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
      resp.status(201).json(respObj);
    });
  })
  /**
   * This function handles GET requests for the USER API and returns all keys stored in Redis
   * @route GET /user/keys
   * @group USER - Methods for the user API
   * @returns {object} 201 succes - Keys has been found in the DB
   * Sends back an array of keys
   * ["key1","key2","key3", ...]
   */
  .get("/keys", (req, resp, next) => {
    userController.get_all_keys((err, res) => {
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
      resp.status(200).json(respObj);
    });
  })
  /**
   * This function handles GET requests for the USER API and returns a json user if the user has been found in db
   * @route GET /user/:username
   * @group USER - Methods for the user API
   * @param {string} username.query.required - username
   * @returns {object} 201 succes - User has been found in the REDIS db
   * Sends back a json user object
   * user: {
   *    username: "tristanqtn",
   *    firstname: "tristan",
   *    lastname: "querton"
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
      respObj = {
        status: "success",
        msg: res,
      };
      resp.status(200).json(respObj);
    });
  })

  /**
   * This function handles DELETE requests for the USER API
   * @route DELETE /user/:username
   * @group USER - Methods for the user API
   * @param {string} username.query.required - username
   * @returns {object} 201 succes - User has been found in the REDIS db and deleted
   * @returns {Error}  400 error - User couldn't be found in REDIS db
   */
  .delete("/:username", (req, resp, next) => {
    const username = req.params.username;
    userController.delete(username, (err, res) => {
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
      resp.status(200).json(respObj);
    });
  });

module.exports = userRouter;
