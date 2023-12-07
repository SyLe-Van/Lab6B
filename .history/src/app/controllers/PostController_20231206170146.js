const fs = require('fs');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const secret = 'uit20521854'
const path = require('path');


const uploadSingleFile = async (fileObject) => {
  const { file } = fileObject;
  let uploadPath = path.resolve(__dirname, "../public/images/upload");
  let extName = path.extname(file.name);
  let baseName = path.basename(file.name, extName);
  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;


  try {
    await file.mv(finalPath);
    return {
      status: "success",
      path: finalName,
      error: null,
    };
  } catch (err) {
    console.log(">>> check error: ", err);
    return {
      status: "failed",
      path: null,
      error: JSON.stringify(err),
    };
  }
};
  class PostController {
    // [POST] /Post
      async post(req, res) {
       const images= await uploadSingleFile(req.files);
        const { file: { name } } = req.files;;
        const parts = name.split('.')
        const ext = parts[parts.length - 1] 

        const {token} = req.cookies
        jwt.verify(token, secret, async (err, info) => {
          if (err) throw err;
          const { title, content, categories } = req.body;
          const postDoc = await Post.create({
          title,
          content,
          categories,
          cover: images.path,
          author: info.id
          })
          res.json(postDoc, { message: 'Post created successfully' });
        })
      }
      // [GET] /Post
      async getPost(req, res) {
        try {
          const posts = await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 });

          res.json(posts);
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      // [GET] /Post/:id
      async getPostById(req, res) {
        const { id } = req.params;
        const postDoc = await Post.findById(id).populate('author', ['username'])
        res.json(postDoc)
      }

      // [GET] /category/:category
      // async getCategories(req, res) {
      //   try {
      //     const lastPost = await Post.findOne().sort({createdAt: -1});
      //     const lastCategories = lastPost.categories;
      //     res.json(lastCategories);
      //   } catch (error) {
      //     res.status(500).json({ error: 'Internal Server Error' });
      //   }
      // }
      // [GET] /getPostByCategories/:categories
      async getPostByCategories(req, res) {
        const {categories} = req.params;
        const posts = await Post.find({ categories });
        res.json(posts);
      }

      // [PUT] /Post/update/:id
      async updatePost(req, res) {
        let name = null;
        if(req.files){
          await uploadSingleFile(req.files);
          const { file: { name } } = req.files;
          const parts = name.split('.')
          const ext = parts[parts.length - 1] 
        }
        const {token} = req.cookies
        jwt.verify(token, secret,{}, async (err, info) => {
          if (err) throw err;
          const { id,title, content, categories } = req.body;
          const postDoc = await Post.findById(id)
          const idAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
          if(!idAuthor){
            return res.status(403).json('You are not the author of this post')
          }
          await postDoc.update({
            title,
            content,
            categories,
            cover: name ? name : postDoc.cover,
          })
          res.json(postDoc)
        })
      }
      // [DELETE] /deletePost/:id
      async deletePost(req, res) {
        const { id } = req.params;
        try {
          await Post.findByIdAndDelete(id);
          res.json({ message: 'Post deleted successfully' });
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
}

module.exports = new PostController; 
