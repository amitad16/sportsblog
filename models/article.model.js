const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  comments: [{
    comment_subject: {
      type: String
    },
    comment_body: {
      type: String
    },
    comment_author: {
      type: String
    },
    comment_email: {
      type: String
    },
    comment_date: {
      type: Date,
      default: Date.now
    }
  }]
});

const Article = mongoose.model('articles', ArticleSchema);

module.exports = Article;

// Get Categories
module.exports.getArticle = (callback, limit) => {
  Article.find(callback).limit(limit).sort({'title': 1});
};
