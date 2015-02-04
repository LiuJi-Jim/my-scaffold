import React from 'react';
import App from 'app';

var app = window.app = React.render(
  <App />,
  document.querySelector('#card-container')
);
app.setState({
  username: 'Jim Liu'
});