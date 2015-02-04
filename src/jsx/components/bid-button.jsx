import React from 'react';

var BidButton = React.createClass({
  getInitialState: function() {
    return {
      value: 0,
      expand: false
    };
  },
  getDefaultProps: function() {
    return {
      onBid: function(val) {
        console.log('bid', val);
      },
      minValue: 0
    }
  },
  handleChange: function(newValue) {
    this.setState({value: newValue});
  },
  bid: function() {
    var state = this.state;
    var props = this.props;
    if (state.expand) {
      this.props.onBid(this.state.value);
    } else {
      this.setState({
        value: props.minValue
      });
    }
    this.setState({
      expand: !state.expand
    });
  },
  cancel: function() {
    this.setState({
      expand: false
    });
  },
  render: function() {
    var state = this.state;
    var props = this.props;
    var valueLink = {
      value: this.state.value,
      requestChange: this.handleChange
    };
    var input = state.expand ? (
      <span className="ui input">
        <input type="text" placeholder={props.minValue} valueLink={valueLink} />
      </span>
    ) : null;
    var buttons = [];
    if (state.expand) {
      buttons.push(
        <button className="ui small button" onClick={this.cancel}>算了</button>
      );
      buttons.push(
        <div className="or"></div>
      );
    }
    var text = state.expand ? '我要了' : '加价';
    buttons.push(
      <button className="ui small positive button" onClick={this.bid}>{text}</button>
    );

    return (
      <span className="bid-button">
        {input}
        <div className="ui buttons">
          {buttons}
        </div>
      </span>
    );
  }
});

return BidButton