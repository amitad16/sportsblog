const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');
const Article = require('../models/article.model');

router.get('/articles', (req, res, next) => {
  Article.find().sort({ 'created_at': -1 })
    .then(articles => {
      res.render('manage_articles', {
        title: 'Manage Articles',
        articles: articles
      });
    });
});

router.get('/categories', (req, res, next) => {
  Category.find().sort({ title: 1 })
    .then(categories => {
      res.render('manage_categories', {
        title: 'Manage Categories',
        categories: categories
      });
    });
});

router.get('/articles/add', (req, res, next) => {
  Category.find().sort({ title: 1 })
    .then(categories => {
      res.render('add_article', {
        title: 'Create Article',
        categories: categories
      });
    })
    .catch(next);

});

router.get('/categories/add', (req, res, next) => {
  res.render('add_category', { title: 'Add Category' });
});

router.get('/articles/edit/:id', (req, res, next) => {
  let articleId = req.params.id;

  Article.findById(articleId)
    .then(article => {
      Category.find().sort({ title: 1 })
        .then(categories => {
          res.render('edit_article', {
            title: 'Edit Article',
            article: article,
            categories: categories
          });
        });
    })
    .catch(next);

});

router.get('/categories/edit/:category_id', (req, res, next) => {
  let categoryId = req.params.category_id;
  Category.findById(categoryId)
    .then(category => {
      res.render('edit_category', {
        title: 'Edit Category',
        category: category
      });
    })
    .catch(next);
});

module.exports = router;
