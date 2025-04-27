const Post = require("./post.model");

class PostService {
  static async createPost(postData) {
    try {
      const post = new Post(postData);
      return await post.save();
    } catch (error) {
      throw error;
    }
  }

  static async getPostsByUser(userId) {
    try {
      return await Post.find({ user: userId }).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }

  static async getPostById(postId) {
    try {
      return await Post.findById(postId);
    } catch (error) {
      throw error;
    }
  }

  static async updatePost(postId, updateData) {
    try {
      return await Post.findByIdAndUpdate(
        postId,
        { $set: updateData },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }
  static async deletePost(postId) {
    try {
      return await Post.findByIdAndDelete(postId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostService;
