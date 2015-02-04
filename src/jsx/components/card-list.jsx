import React from 'react';
import Card from './card';

var CardList = React.createClass({
  render: function() {
    var props = this.props;
    var data = props.data;
    var cards = data.map(function(item) {
      return (
        <Card data={item} />
      );
    });
    return (
      <div className="bs-card-list">
        {cards}
      </div>
    );
  }
});

return CardList;