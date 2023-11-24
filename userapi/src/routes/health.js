const express = require("express");
const db = require("../dbClient");

const healthRouter = express.Router();

healthRouter
  /**
   * This function sends back the health of the application
   * @route GET /health
   * @group HEALTH - Methods for obtaining the current health state
   * @returns {object} 200 succes - App healthy
   * @returns {Error}  503 error - App unhealthy
   */
  .get("/", async (req, res, next) => {
    const healthcheck = {
      uptime: process.uptime(),
      status: "OK",
      timestamp: Date.now(),
    };

    try {
      if (db.server_info.aof_last_write_status === "ok")
        res.status(200).send(healthcheck);
      else {
        healthcheck.status = error;
        res.status(503).send();
      }
    } catch (error) {
      healthcheck.status = error;
      res.status(503).send();
    }
  });

module.exports = healthRouter;
