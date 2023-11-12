const db = require("../dbClient");

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if (!user.username)
      return callback(new Error("Wrong user parameters"), null);
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    };
    // Save to DB
    db.hmset(user.username, userObj, (err, res) => {
      if (err) return callback(err, null);
    });
  },
  get: (username, callback) => {
    if (!username) return callback(new Error("Wrong user parameters"), null);
    else {
      db.hgetall(username, (err, res) => {
        if (err) return callback(err, null);
        else {
          return callback(null, res);
        }
      });
    }
  },
};
