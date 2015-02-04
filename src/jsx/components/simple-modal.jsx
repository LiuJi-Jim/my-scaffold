var SimpleModal = React.createClass({
  getInitialState: function() {
    return {
      name: 'Jim',
      times: 0
    };
  },
  show: function() {
    var holder = this.getDOMNode();
    var modal = this.refs.modal.getDOMNode();
    var root = $(modal);
    root.modal({
      detachable: false,
      onHidden: function() {
        root.appendTo(holder);
      }
    }).modal('show');
  },
  handleChange: function(newValue) {
    this.setState({name: newValue});
  },
  inc: function() {
    this.setState({
      times: this.state.times + 1
    });
  },
  render: function() {
    var state = this.state;
    var valueLink = {
      value: this.state.name,
      requestChange: this.handleChange
    };
    return (
      <div className="simple-modal-placeholder">
        <button className="ui primary button" onClick={this.show}>open modal</button>
        <div ref="modal" className="ui modal">
          <i className="close icon"></i>
          <div className="header">
            Click x {state.times}
          </div>
          <div className="content">
            <div className="ui black button" onClick={this.inc}>INC</div>
            <p className="ui input"><input type="text" valueLink={valueLink} /></p>
            <p>Hello {state.name}</p>
            {this.props.children}
          </div>
          <div className="actions">
            <div className="ui black button">
              Nope
            </div>
            <div className="ui positive right labeled icon button">
              Yep
              <i className="checkmark icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
});