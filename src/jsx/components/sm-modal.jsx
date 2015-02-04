var SMModal = React.createClass({
  getDefaultProps: function() {
    return {
      header: 'T_T'
    }
  },
  show: function() {
    var holder = this.getDOMNode();
    var modal = this.refs.modal.getDOMNode();
    var root = $(modal);
    root.modal({
      detachable: false
    }).modal('show');
  },
  render: function() {
    var props = this.props;
    return (
      <div className="sm-modal-placeholder">
        <div ref="modal" className="ui modal">
          <i className="close icon"></i>
          <div className="header">
            {props.header}
          </div>
          <div className="content">
            {props.children}
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