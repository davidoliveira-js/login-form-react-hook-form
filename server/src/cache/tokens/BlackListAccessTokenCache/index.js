const MainCacheManipulator = require('../../MainCacheManipulator');
const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');

class BlackListAccessTokenCache extends MainCacheManipulator {
  constructor() {
    super('blacklist-access-token-cache:');
  }

  generateHashedAccessToken(accessToken) {
    return createHash('sha256').update(accessToken).digest('hex');
  }

  async addAccessToken(accessToken) {
    try {
      const expirationDate = jwt.decode(accessToken).exp;
      const hashedAccessToken =
        this.generateHashedAccessToken(accessToken);
      await this.set(hashedAccessToken, '');
      return await this.expireAt(hashedAccessToken, expirationDate);
    } catch (error) {
      throw error;
    }
  }

  async containsAccessToken(accessToken) {
    try {
      const hashedAccessToken =
        this.generateHashedAccessToken(accessToken);
      return this.get(hashedAccessToken);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BlackListAccessTokenCache;
