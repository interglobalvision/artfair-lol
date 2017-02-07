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
  }

  componentDidUpdate() {
    this.setState({hasVisited: cookie.load('hasVisited')});
  }

  render() {
    if (!this.state.hasVisited) {
      return (
        <div id="main-container">
          <Header leftLabel={this.props.headerLeftLabel} />
          <div className="header-padding">
            <About />
          </div>
          <div id="main-content" className="padding-top-small">
            <div className="container">
              {this.props.content}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="main-container">
          <Header leftLabel={this.props.headerLeftLabel} />
          <div id="main-content" className="header-padding">
            <div className="container">
              {this.props.content}
            </div>
          </div>
          <About />
        </div>
      );
    }

  }
};
