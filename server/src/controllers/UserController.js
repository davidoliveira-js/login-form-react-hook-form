const { UserServices } = require('../services');
const bcrypt = require('bcrypt');
const userServices = new UserServices('User');
const {
  NotFound,
  Unauthorized,
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
} = require('../utils/constants');

module.exports = {
  async findAll(req, res, next) {
    try {
      if (!req.access.any.allowed) {
        throw new Unauthorized(UserNotAuthorized);
      }
      const users = await userServices.getAllData();
      return res.status(200).json({
        success: true,
        return: DataFound,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  async findById(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await userServices.getOneData({
        id: userId,
      });

      if (!user) {
        throw new NotFound(DataNotFound);
      }

      return res.status(200).json({
        success: true,
        return: DataFound,
        data: user,
      });
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
        success: true,
        return: DataSuccessCreate,
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { userId } = req.params;
      if (!req.access.any.allowed && userId != req.user.id) {
        throw new Unauthorized(UserNotAuthorized);
      }
      const { email } = req.body;
      const updatedUser = await userServices.updateOneData(
        { email },
        userId
      );

      return res.status(200).json({
        success: updatedUser[0] ? true : false,
        return: updatedUser[0] ? DataSuccessUpdate : DataFailedUpdate,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { userId } = req.params;
      const deletedUser = await userServices.deleteOneData(userId);
      return res.status(200).json({
        success: deletedUser ? true : false,
        return: deletedUser ? DataSuccessDelete : DataFailedDelete,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  async restore(req, res, next) {
    try {
      const { userId } = req.params;
      const restoredUser = await userServices.restoreData(userId);
      return res.status(200).json({
        success: restoredUser ? true : false,
        return: restoredUser
          ? DataSuccessRestored
          : DataFailedRestored,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
