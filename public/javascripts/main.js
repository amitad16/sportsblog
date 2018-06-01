$(document).ready(function () {
  // DELETE CATEGORY
  $('.btn-category-delete').on('click', function () {
    let btn = $(this);
    let categoryId = btn.attr('id');

    $.ajax({
      type: 'DELETE',
      url: '/categories/delete/' + categoryId,
      success: function (response) {
        btn.parent().parent().remove();
      },
      error: function (error) {
        console.log('EEEERRRRROOOORRRR');
        console.log(error);
      }
    });
  });

  // DELETE ARTICLE
  $('.btn-article-delete').on('click', function () {
    let btn = $(this);
    let articleId = btn.attr('id');

    $.ajax({
      type: 'DELETE',
      url: '/articles/delete/' + articleId,
      success: function (response) {
        btn.parent().parent().remove();
      },
      error: function (error) {
        console.log('EEEERRRRROOOORRRR');
        console.log(error);
      }
    });
  });
});