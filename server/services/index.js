const users = require('./users/users.service.js');
const speeddial = require('./speeddial/speeddial.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(speeddial);
};
