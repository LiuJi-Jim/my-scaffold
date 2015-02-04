var SMSelection = React.createClass({
  getInitialState: function() {
    return {
      value: null
    };
  },
  handleChange: function(newValue) {
    this.setState({ value: newValue }, function() {
      this.props.onChange && this.props.onChange.call(this, newValue);
    });
  },
  componentDidMount: function() {
    var me = this;
    var root = this.getDOMNode();
    $(root).dropdown({
      onChange: me.handleChange
    });
  },
  createItem: function(dataItem) {
    return (
      <div className="item" data-value={dataItem.value}>{dataItem.text}</div>
    );
  },
  render: function() {
    var props = this.props;
    var items = props.data.map(this.createItem);

    return (
      <div className="ui selection dropdown">
        <input type="hidden" name={props.name} value={props.defaultValue} ref="hidden" />
        <div className="default text">{props.defaultText}</div>
        <i className="dropdown icon"></i>
        <div className="menu">
          {items}
        </div>
      </div>
    );
  }
});