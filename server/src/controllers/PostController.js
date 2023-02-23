const { PostServices } = require('../services');
const { NotFound } = require('../utils/error-handler/Exceptions');
const { DataNotFound, NotFoundMsg } = require('../utils/constants');

const postServices = new PostServices('Post');

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
      const { _end, _order, _sort, _start, userId } = req.query;

      const queryFilters = filterQueryFilters({
        user_id: userId,
      });

      const posts = await postServices.getAndCountAllData({
        where: queryFilters,
        order: [_sort, _order],
        offset: _start,
        limit: _end,
      });

      res.set('Access-Control-Expose-Headers', 'X-Total-Count');
      res.set('X-Total-Count', posts.count);
      return res.status(200).json(posts.rows);
    } catch (error) {
      next(error);
    }
  },

  async findById(req, res, next) {
    try {
      const { postId } = req.params;
      // if (!req.access.any.allowed && userId != req.user.id) {
      //   throw new Unauthorized(UserNotAuthorized);
      // }
      const post = await postServices.getOneData({
        id: postId,
      });

      if (!post) {
        throw new NotFound(DataNotFound);
      }

      return res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },

  async store(req, res, next) {
    try {
      const { title, body, userId } = req.body;
      const newPost = await postServices.createOneData({
        title,
        body,
        user_id: userId,
      });

      return res.status(200).json({
        id: newPost.id,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { postId } = req.params;
      // if (!req.access.any.allowed && userId != req.user.id) {
      //   throw new Unauthorized(UserNotAuthorized);
      // }
      const { title, body } = req.body;
      const updatedPost = await postServices.updateOneData(
        { title, body },
        postId
      );
      if (updatedPost[0]) {
        return res.status(200).json({ id: postId });
      }
      throw new NotFound(NotFoundMsg);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { postId } = req.params;
      const deletedPost = await postServices.deleteOneData(postId);
      if (deletedPost) {
        return res.status(200).json({
          id: postId,
        });
      }
      throw new NotFound(NotFoundMsg);
    } catch (error) {
      next(error);
    }
  },

  async restore(req, res, next) {
    try {
      const { postId } = req.params;
      const restoredPost = await postServices.restoreData(postId);
      if (restoredPost) {
        return res.status(200).json({
          id: postId,
        });
      }
      throw new NotFound(NotFoundMsg);
    } catch (error) {
      next(error);
    }
  },
};
