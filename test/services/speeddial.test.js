const assert = require('assert');
const app = require('../../server/app');

describe('\'speeddial\' service', () => {
  it('registered the service', () => {
    const service = app.service('speeddial');

    assert.ok(service, 'Registered the service');
  });
});
