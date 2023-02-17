const MainCacheManipulator = require('../../MainCacheManipulator/index');

class WhiteListAccessTokenCache extends MainCacheManipulator {
  constructor() {
    super('whitelist-refresh-token-cache:');
  }
}

module.exports = WhiteListAccessTokenCache;
