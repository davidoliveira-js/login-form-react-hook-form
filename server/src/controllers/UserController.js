const { UserServices } = require('../services');
const bcrypt = require('bcrypt');
const userServices = new UserServices('User');

module.exports = {
  async findAll(req, res) {
    try {
      const users = await userServices.getAllData();
      return res.status(200).json({
        success: true,
        return: users,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },

  async findById(req, res) {
    try {
      const { userId } = req.params;

      const user = await userServices.getOneData({
        id: userId,
      });

      return res.status(200).json({
        success: true,
        return: {
          user,
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },

  async store(req, res) {
    try {
      const { email, password } = req.body;

      const newUser = await userServices.createOneData({
        email,
        password: await bcrypt.hash(password, 12),
      });

      return res.status(200).json({
        success: true,
        return: newUser,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },

  async update(req, res) {
    try {
      const { userId } = req.params;
      const { email } = req.body;

      const updatedUser = await userServices.updateOneData(
        { email },
        userId
      );

      return res.status(200).json({
        success: updatedUser[0] ? true : false,
        return: updatedUser[0] ? 'Atualizado' : 'Não atualizado',
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },

  async delete(req, res) {
    try {
      const { userId } = req.params;
      const deletedUser = await userServices.deleteOneData(userId);
      return res.status(200).json({
        success: deletedUser ? true : false,
        return: deletedUser ? 'Deletado' : 'Não deletado',
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },

  async restore(req, res) {
    try {
      const { userId } = req.params;
      const restoredUser = await userServices.restoreData(userId);
      return res.status(200).json({
        success: restoredUser ? true : false,
        return: {
          message: restoredUser ? 'Restaurado' : 'Não restaurado',
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
};
