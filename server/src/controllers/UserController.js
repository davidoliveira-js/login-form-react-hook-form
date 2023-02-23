const { UserServices } = require('../services');
const bcrypt = require('bcrypt');
const userServices = new UserServices('User');
const {
  NotFound,
  Unauthorized,
  InternalServerError,
} = require('../utils/error-handler/Exceptions');
const {
  DataNotFound,
  DataSuccessUpdate,
  DataFailedUpdate,
  DataSuccessDelete,
  DataFailedDelete,
  DataSuccessRestored,
  DataFailedRestored,
  DataFound,
  DataSuccessCreate,
  UserNotAuthorized,
  StatusError,
  NotFoundMsg,
} = require('../utils/constants');

function filterQueryFilters(queryFilters) {
  const asArray = Object.entries(queryFilters);
  const filtered = asArray.filter(
    ([key, value]) => typeof value !== 'undefined'
  );
  return Object.fromEntries(filtered);
}

module.exports = {
  async findAll(req, res, next) {
    try {
      // if (!req.access.any.allowed) {
      //   throw new Unauthorized(UserNotAuthorized);
      // }
      const {
        _end,
        _order,
        _sort,
        _start,
        role,
        isEmailVerified,
        email,
      } = req.query;

      const queryFilters = filterQueryFilters({
        role: role,
        isEmailVerified: isEmailVerified,
        email: email,
      });

      const users = await userServices.getAndCountAllData({
        where: queryFilters,
        order: [_sort, _order],
        offset: _start,
        limit: _end,
      });

      res.set('Access-Control-Expose-Headers', 'X-Total-Count');
      res.set('X-Total-Count', `${users.count}`);

      return res.status(200).json(users.rows);
    } catch (error) {
      next(error);
    }
  },

  async findById(req, res, next) {
    try {
      const { userId } = req.params;
      // if (!req.access.any.allowed && userId != req.user.id) {
      //   throw new Unauthorized(UserNotAuthorized);
      // }
      const user = await userServices.getOneData({
        id: userId,
      });

      if (!user) {
        throw new NotFound(DataNotFound);
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async store(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await userServices.createOneData({
        email,
        password: await bcrypt.hash(password, 12),
      });

      return res.status(200).json({
        id: newUser.id,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { userId } = req.params;
      // if (!req.access.any.allowed && userId != req.user.id) {
      //   throw new Unauthorized(UserNotAuthorized);
      // }
      const { email } = req.body;
      const updatedUser = await userServices.updateOneData(
        { email },
        userId
      );

      if (updatedUser[0]) {
        return res.status(200).json({ id: userId });
      }
      throw new NotFound(NotFoundMsg);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { userId } = req.params;
      const deletedUser = await userServices.deleteOneData(userId);
      if (deletedUser) {
        return res.status(200).json({
          id: userId,
        });
      }
      throw new NotFound(NotFoundMsg);
    } catch (error) {
      next(error);
    }
  },

  async restore(req, res, next) {
    try {
      const { userId } = req.params;
      const restoredUser = await userServices.restoreData(userId);
      if (restoredUser) {
        return res.status(200).json({
          id: userId,
        });
      }
      throw new NotFound(NotFoundMsg);
    } catch (error) {
      next(error);
    }
  },
};
