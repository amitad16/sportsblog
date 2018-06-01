const express = require('express');
const router = express.Router();
const Article = require('../models/article.model');

router.get('/', (req, res, next) => {
  Article.find().sort({ 'created_at': -1 })
    .then(articles => {
      res.render('index', {
        title: 'SportsBlog',
        articles: articles
      });
    });
});

module.exports = router;
