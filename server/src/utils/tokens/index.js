const jwt = require('jsonwebtoken');
const moment = require('moment');
const { randomBytes } = require('crypto');
const { BlackListAccessTokenCache } = require('../../cache');
const { WhiteListRefreshTokenCache } = require('../../cache');

const blackListAccessTokenCache = new BlackListAccessTokenCache();
const whiteListRefreshTokenCache = new WhiteListRefreshTokenCache();

const { UserNotAuthorized } = require('../constants');
const { Unauthorized } = require('../error-handler/Exceptions');

const verifyBlackListAccessToken = async (accessToken) => {
  const containsAccessToken =
    await blackListAccessTokenCache.containsAccessToken(accessToken);
  if (containsAccessToken) {
    throw new jwt.JsonWebTokenError(UserNotAuthorized);
  }
  return;
};

module.exports = {
  createAccessToken(user, [quantityUnit, timeUnit]) {
    const payload = { user };
    return (accsessToken = jwt.sign(
      {
        payload,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: quantityUnit + timeUnit }
    ));
  },

  async verifyAccessToken(accessToken) {
    try {
      await verifyBlackListAccessToken(accessToken);
      const { payload } = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY
      );
      return payload.user.id;
    } catch (error) {
      throw error;
    }
  },

  async invalidateAccessToken(accessToken) {
    try {
      return await blackListAccessTokenCache.addAccessToken(
        accessToken
      );
    } catch (error) {
      throw error;
    }
  },

  async createOpaqueToken(id, [quantityUnit, timeUnit]) {
    try {
      const opaqueToken = randomBytes(24).toString('hex');
      const expirationDate = moment()
        .add(quantityUnit, timeUnit)
        .unix();
      await whiteListRefreshTokenCache.set(
        opaqueToken,
        id,
        expirationDate
      );
      return opaqueToken;
    } catch (error) {
      throw error;
    }
  },

  async verifyOpaqueToken(refreshToken) {
    try {
      if (!refreshToken) {
        throw Unauthorized(UserNotAuthorized);
      }
      const id = await whiteListRefreshTokenCache.get(refreshToken);
      if (!id) {
        return false;
      }
      return id;
    } catch (error) {
      throw error;
    }
  },

  async invalidateOpaqueToken(refreshToken) {
    try {
      return await whiteListRefreshTokenCache.del(refreshToken);
    } catch (error) {
      throw error;
    }
  },
};
