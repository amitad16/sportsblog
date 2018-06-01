const express = require('express');
const router = express.Router();
const {check, validationResult} = require("express-validator/check");
const Article = require('../models/article.model');
const Category = require('../models/category.model');

const url = require('url');

router.get('/', (req, res, next) => {
  Article.find().sort({ 'created_at': -1 })
    .then(articles => {
      res.render('articles', {
        title: 'Articles',
        articles: articles
      });
    });
});

router.get('/show/:id', (req, res, next) => {
  let articleId = req.params.id;

  Article.findById(articleId)
    .then(article => {
      res.render('article', {
        title: article.title,
        article: article
      });
    })
    .catch(next);
});

router.get('/category/:category_id', (req, res, next) => {
  let categoryId = req.params.category_id;

  Category.findById(categoryId)
    .then((category) => {
      Article.find({'category': category.title}).sort({ 'created_at': -1 })
        .then((articles) => {
          if (articles.length === 0) {
            res.render('articles', {
              title: 'Category Articles',
              count: 1
            });
          } else {
            res.render('articles', {
              title: 'Category Articles',
              articles: articles
            });
          }
        })
        .catch(next);
    })
    .catch(next);
});

router.post('/add', [
  check('title', 'Title must be minimum 3 char long')
    .trim()
    .isLength({min: 3}),
  check('category', 'Please choose category')
    .isLength({min: 1}),
  check('author', 'Author name must be minimum 3 char long')
    .trim()
    .isLength({min: 3}),
  check('body', 'Body must be minimum 50 char long')
    .trim()
    .isLength({min: 50})
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    Category.find().sort({ title: 1 })
      .then(categories => {
        res.render('add_article', {
          title: 'Create Article',
          categories: categories,
          errors: errors.mapped()
        });
      });
  } else {
    let newArticle = req.body;

    Article.create(newArticle)
      .then(() => {
        req.flash('success', 'Article Created');
        res.redirect('/manage/articles')
      })
      .catch(next);
  }
});

router.post('/edit/:id', [
  check('title', 'Title must be minimum 3 char long')
    .trim()
    .isLength({min: 3}),
  check('category', 'Please choose category')
    .isLength({min: 1}),
  check('author', 'Author name must be minimum 3 char long')
    .trim()
    .isLength({min: 3}),
  check('body', 'Body must be minimum 50 char long')
    .trim()
    .isLength({min: 50})
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    let articleId = req.params.id;

    Article.findById(articleId)
      .then(article => {
        Category.find().sort({ title: 1 })
          .then(categories => {
            res.render('edit_article', {
              title: 'Edit Article',
              article: article,
              categories: categories,
              errors: errors.mapped()
            });
          });
      })
      .catch(next);
  } else {
    let articleId = req.params.id;
    let editedArticle = req.body;

    Article.findByIdAndUpdate(articleId, editedArticle)
      .then(() => {
        req.flash('success', 'Article Updated');
        res.redirect('/manage/articles')
      })
      .catch(next);
  }
});

router.delete('/delete/:id', (req, res, next) => {
  let articleId = req.params.id;

  Article.findByIdAndDelete(articleId)
    .then(article => res.status(204).send(article))
    .catch(next);
});

router.post('/comments/add/:id', (req, res) => {
  let articleId = req.params.id;
  let comment = req.body;

  Article.findByIdAndUpdate(articleId, {$push: {comments: comment}})
    .then(() => {
      res.redirect('/articles/show/' + articleId);
    });
});

module.exports = router;
