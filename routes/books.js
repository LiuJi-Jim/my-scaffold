var fs = require('fs');
var express = require('express');
var router = express.Router();
var path = './data/books.json';
var readData = function(cb) {
  fs.readFile(path, 'utf-8', function(err, data) {
    if (err) {
      return cb(err, data);
    }
    try {
      data = JSON.parse(data) || [];
    } catch(ex) {
      data = [];
    }
    cb(err, data);
  });
};
var writeData = function(data, cb) {
  fs.writeFile('./data/books.json', JSON.stringify(data, null, '  '), 'utf-8', function(err) {
    cb(err);
  });
};

/* GET books listing. */
router.get('/', function(req, res) {
  readData(function(err, data) {
    if (err) {
      return res.send([]);
    }
    res.send(data);
  });
});
router.get('/:id', function(req, res) {
  readData(function(err, data) {
    if (err) {
      return res.send(null);
    }
    for (var i=0; i<data.length; ++i) {
      if (data[i].id == req.params.id) {
        return res.send(data[i]);
      }
    }
    res.send(null);
  });
});

router.get('/:id', function(req, res) {
  readData(function(err, data) {
    if (err) {
      return res.send(null);
    }
    for (var i=0; i<data.length; ++i) {
      if (data[i].id == req.params.id) {
        return res.send(data[i]);
      }
    }
    res.send(null);
  });
});

router.put('/', function(req, res) {
  res.send(req.body);
});

router.post('/:id', function(req, res) {
  readData(function(err, books) {
    if (err) {
      return res.send(false);
    }
    for (var i=0; i<books.length; ++i) {
      if (books[i].id == req.params.id) {
        var book = books[i];
        var update = req.body;
        var success = false;
        if (typeof book.bid === 'undefined') {
          if (parseFloat(update.bid) >= parseFloat(book.price)) {
            success = true;
          }
        } else if (parseFloat(update.bid) > parseFloat(book.bid)) {
          success = true;
        }
        if (success) {
          books[i] = update;
          writeData(books, function(err) {
            res.send(err ? false : true);
          });
          return;
        } else {
          return res.send(false);
        }
      }
    }
    res.send(false);
  });
});
module.exports = router;
