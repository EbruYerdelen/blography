const express = require("express");
const router = express.Router();
const PostController = require("./post.controller");
const authMiddleware = require("../../middlewares/auth-middleware");

router.post("/", authMiddleware, PostController.createPost);

router.get("/my", authMiddleware, PostController.getUserPosts);

router.get("/my/:id", PostController.getPostById);

router.put("/post/:id", PostController.updatePost);

router.delete("/:id", authMiddleware, PostController.deletePost);

module.exports = router;
