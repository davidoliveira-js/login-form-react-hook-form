const accessControl = require('./accessControl');
const {
  Unauthorized,
} = require('../../utils/error-handler/Exceptions');

const { UserNotAuthorized } = require('../../utils/constants');

const methods = {
  read: {
    any: 'readAny',
    own: 'readOwn',
  },
  create: {
    any: 'createAny',
    own: 'createOwn',
  },
  delete: {
    any: 'deleteAny',
    own: 'deleteOwn',
  },
  update: {
    any: 'updateAny',
    own: 'updateOwn',
  },
};

module.exports = (entity, action) => (req, res, next) => {
  const rolePermissions = accessControl.can(req.user.role);
  const actions = methods[action];
  const permissionAny = rolePermissions[actions.any](entity);
  const permissioOwn = rolePermissions[actions.own](entity);

  if (
    permissionAny.granted === false &&
    permissioOwn.granted === false
  ) {
    throw new Unauthorized(UserNotAuthorized);
  }

  req.access = {
    any: {
      allowed: permissionAny.granted,
      attributes: permissionAny.attributes,
    },
    own: {
      allowed: permissioOwn.granted,
      attributes: permissioOwn.attributes,
    },
  };

  next();
};
