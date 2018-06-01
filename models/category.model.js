const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  }
});

const Category = mongoose.model('categories', CategorySchema);

module.exports = Category;

// Get Categories
module.exports.getCategory = (callback, limit) => {
  Category.find(callback).limit(limit).sort({'title': 1});
};
