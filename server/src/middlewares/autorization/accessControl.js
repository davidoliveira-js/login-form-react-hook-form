const AccessControl = require('accesscontrol');
const accessControl = new AccessControl();

accessControl
  .grant('admin')
  .readAny(['users'])
  .createAny(['users'])
  .updateAny(['users'])
  .deleteAny(['users']);

accessControl.grant('user').readOwn(['users']).updateOwn('users');

module.exports = accessControl;
