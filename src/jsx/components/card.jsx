import React from 'react';
import BidButton from './bid-button';
import BookService from '../services/book-service';

var PriceTag = React.createClass({
  render: function() {
    var cx = React.addons.classSet;
    var props = this.props;
    var priceClass = {};
    if (props.price === 0) {
      priceClass['free'] = true;
    }
    if (typeof props.bid !== 'undefined') {
      priceClass['delete'] = true;
    }
    var priceCX = cx({
      price: true,
      free: props.price === 0,
      delete: props.bid > 0
    });
    var price = (
      <span className={priceCX}>
        { props.price == 0 ? '免费' : ('￥' + props.price) }
      </span>
    );
    var bid = props.bid ? (<span className="bid">￥{props.bid}</span>) : null;
    return (
      <div className="item pricetag">
        <span className="label">现价：</span>
        {price}
        {bid}
      </div>
    );
  }
});
var Card = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  onBid: function(val) {
    var me = this;
    var data = this.props.data;
    data.bid = val;
    data.bidder = app.state.username;
    BookService.update(data).then(function(result) {
      if (result) {
        me.setState({
          data: data
        });
      } else {
        alert('failed..');
      }
    })
  },
  buy: function() {
    this.onBid(this.props.data.price);
  },
  render: function() {
    var state = this.state;
    var cx = React.addons.classSet;

    var typeMap = {
      book: {
        text: '书',
        icon: 'book icon'
      },
      'music-dvd': {
        text: 'DVD',
        icon: 'music icon'
      }
    };

    var props = this.props;
    var data = props.data;
    var coverImage = (/^http/).test(data.cover) ? data.cover : '/static/images/' + data.cover;
    var publish = data.publish ? (<span className="publish">({data.publish})</span>) : null;
    var author = data.author ? (<div className="item author">{data.author.join(', ')} 著</div>) : null;
    var translator = data.translator ? (<div className="item translator">{data.translator.join(', ')} 译</div>) : null;
    var pricetag = <PriceTag price={data.price || 0} bid={data.bid || 0} />;
    var bidder = data.bidder ? (<div className="item bidder">已被<strong>{data.bidder}</strong>{data.out ? '拿下' : '抢占先机'}</div>) : null;

    var controls = [];
    if (!data.out) {
      if (typeof data.bid === 'undefined') {
        controls.push(
          <span className="ui buttons">
            <button className="ui small primary button" onClick={this.buy}>我要了</button>
          </span>
        );
      } else {
        controls.push(
          <BidButton minValue={data.bid || data.price} onBid={this.onBid} />
        );
      }
    }
    var footer = controls.length > 0 ? [
      <div className="ui divider"></div>,
      <div className="control">{controls}</div>
    ] : null;

    return (
      <div className="ui piled segment bs-card">
        <div className="ui dividing header">
          <span className="name">{data.name}</span>
          <span className="labels">
            <span className="ui label">
              <i className={typeMap[data.type].icon}></i>
              <span>{typeMap[data.type].text}</span>
            </span>
            { data.out ? <span className="ui label out">已出</span> : undefined }
          </span>
        </div>

        <div className="ui grid">
          <div className="four wide column">
            <div className="ui small image bs-cover">
              <img src={coverImage} />
            </div>
          </div>
          <div className="twelve wide column">
            <div className="ui list">
              <div className="item pricetag">
                <span className="label">原价：</span>
                <span className="price">￥{data.originalPrice}</span>
              </div>
              {pricetag}
              {bidder}
              {author}
              {translator}
            </div>
          </div>
        </div>
        {footer}
      </div>
    );
  }
});

return Card;