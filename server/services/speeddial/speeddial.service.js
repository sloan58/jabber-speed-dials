// Initializes the `speeddial` service on path `/speeddial`
const { Speeddial } = require('./speeddial.class');
const createModel = require('../../models/speeddial.model');
const hooks = require('./speeddial.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/speeddial', new Speeddial(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('speeddial');

  service.hooks(hooks);
};
