const jwt = require('jsonwebtoken');

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
    const { payload } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY
    );

    return payload.user.id;
  },
};
