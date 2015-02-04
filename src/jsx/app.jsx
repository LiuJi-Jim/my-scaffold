import React from 'react';
import CardList from 'components/card-list';
import BookService from 'services/book-service';

var App = React.createClass({
  getInitialState: function() {
    var me = this;
    return {
      loading: true,
      books: []
    };
  },
  componentDidMount: function () {
    var me = this;
    BookService.query().then(function(books) {
      me.setState({
        books: books
      });
    }).always(function() {
      me.setState({
        loading: false
      });
    });
  },
  render: function() {
    var state = this.state;
    if (state.loading) {
      return (
        <div className="ui loading piled segment">Loading...</div>
      );
    }
    return (
      <CardList data={this.state.books} />
    );
  }
});

return App;