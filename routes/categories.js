const express = require('express');
const router = express.Router();
const {check, validationResult} = require("express-validator/check");
const Category = require('../models/category.model');

router.get('/', (req, res, next) => {
  Category.find().sort({title: 1})
    .then(categories => {
      res.render('categories', {
        title: 'Categories',
        categories: categories
      });
    });
});

router.post('/add', [
  check('title', 'Title is required')
    .trim()
    .isLength({min: 1})
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('add_category', {
      title: 'Create Category',
      errors: errors.mapped()
    });
  } else {
    let newCategory = req.body;
    Category.create(newCategory)
      .then(() => {
        req.flash('success', 'Category Saved');
        res.redirect('/manage/categories')
      })
      .catch(next);
  }
});

router.post('/edit/:id', [
  check('title', 'Title is required')
    .trim()
    .isLength({min: 1})
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let categoryId = req.params.id;
    Category.findById(categoryId)
      .then(category => {
        res.render('edit_category', {
          title: 'Edit Category',
          category: category,
          errors: errors.mapped()
        });
      });
  } else {
    let editedCategory = req.body;
    let id = req.params.id;
    Category.findByIdAndUpdate(id, editedCategory)
      .then(() => {
        req.flash('success', 'Category Updated');
        res.redirect('/manage/categories')
      })
      .catch(next);
  }
});

router.delete('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  Category.findByIdAndDelete(id)
    .then(category => res.status(204).send(category))
    .catch(next);
});

router.get('/*', (req, res, next) => {
  res.status(404).send('Page not Found');
});
module.exports = router;
