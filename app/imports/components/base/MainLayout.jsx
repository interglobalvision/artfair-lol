import React, { Component } from 'react';

import { About } from '/imports/components/About.jsx';
import { Header } from '/imports/components/base/Header.jsx';

import cookie from 'react-cookie';

export class MainLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasVisited: cookie.load('hasVisited'),
    }

    cookie.save('hasVisited', true, { path: '/' });

    $('html, body').css('visibility', 'visible');
  }

  componentWillUpdate() {
    if (!this.state.hasVisited) {
      this.setState({hasVisited: cookie.load('hasVisited')});
    }
  }

  render() {
    if (!this.state.hasVisited) {
      return (
        <div id="main-container">
          <Header leftLabel={this.props.headerLeftLabel} navRoute={this.props.headerNavRoute} hashtag={this.props.headerHashtag} hideCamera={this.props.hideHeaderCamera} />
          <div className="header-padding">
            <About />
          </div>
          <div id="main-content">
            {this.props.content}
          </div>
        </div>
      );
    } else {
      return (
        <div id="main-container">
          <Header leftLabel={this.props.headerLeftLabel} navRoute={this.props.headerNavRoute} hashtag={this.props.headerHashtag} hideCamera={this.props.hideHeaderCamera} />
          <div id="main-content" className="header-padding">
            {this.props.content}
          </div>
          <About />
        </div>
      );
    }

  }
};
