const { createAccessToken } = require('../utils/tokens');

module.exports = {
  async login(req, res, next) {
    try {
      const { user } = req;
      const accessToken = createAccessToken(
        { id: user.id, email: user.email },
        [15, 'm']
      );

      return res.json({ success: true, return: { accessToken } });
    } catch (error) {
      next(error);
    }
  },
};
