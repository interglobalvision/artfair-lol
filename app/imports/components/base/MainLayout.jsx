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

  render() {
    return (
      <div id="main-container">
        {!this.state.hasVisited &&
          <About />
        }
        <Header />
        <div id="main-content" className='border-bottom-grey'>
          <div className="container">
            {this.props.content}
          </div>
        </div>
        {this.state.hasVisited &&
          <About />
        }
      </div>
    );
  }
};
