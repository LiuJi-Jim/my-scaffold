var BookService = {
  query: function() {
    return $.ajax({
      url: '/books',
      dataType: 'json'
    });
  },
  update: function(data) {
    return $.ajax({
      url: `/books/${data.id}`,
      data: data,
      method: 'POST',
      dataType: 'json'
    });
  }
}

return BookService;