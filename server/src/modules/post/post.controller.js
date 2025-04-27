const PostService = require("./post.service");

class PostController {
  static async createPost(req, res) {
    try {
      const { title, content } = req.body;
      const postData = {
        title,
        content: content || null,
        user: req.user.userId,
      };

      const post = await PostService.createPost(postData);
      res.status(201).json({ success: true, data: post });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getUserPosts(req, res) {
    try {
      const posts = await PostService.getPostsByUser(req.user.userId);
      res.status(200).json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Verify the post belongs to the user
      const post = await PostService.getPostById(id);
      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }
      if (post.user.toString() !== req.user.userId) {
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized" });
      }

      const updatedPost = await PostService.updatePost(id, updateData);
      res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  static async deletePost(req, res) {
    try {
      const { id } = req.params;

      const post = await PostService.getPostById(id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      if (post.user.toString() !== req.user.userId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized - You can only delete your own posts",
        });
      }

      await PostService.deletePost(id);
      res.status(200).json({
        success: true,
        message: "Post deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = PostController;
