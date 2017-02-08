import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';

import sanitizeHtml from 'sanitize-html';

export class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {email: '', password: ''};

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  onInputChange(event) {
    if (event.target.name === 'email') {
      this.setState({email: event.target.value});
    } else if (event.target.name === 'password') {
      this.setState({password: event.target.value});
    }
  }

  clearInput() {
    this.setState({email: ''});
    this.setState({password: ''});
  }

  onSubmitForm(event) {
    event.preventDefault();

    const email = sanitizeHtml(this.state.email);
    const password = sanitizeHtml(this.state.password);

    if (email !== '' && password !== '') {
      Meteor.loginWithPassword(email, password, function(error){
        if(error){
          console.log(error.reason);
        } else {
          this.clearInput;
          FlowRouter.go('/admin');
        }
      });
    }

    return false;
  }

  render() {
    return(
      <section id='login' className='container'>
        <div className="grid-row">
          <div className="grid-item item-s-12 item-m-6 item-l-4">
            <h3>Admin Login</h3>
            <form id="login-form" onSubmit={this.onSubmitForm}>
              <div>
                <label>Email</label>
                <input value={this.state.email} onChange={this.onInputChange} name="email" id="login-email" className="border-bottom-grey padding-top-tiny padding-bottom-tiny" />
              </div>
              <div>
                <label className="u-inlineblock">Password</label>
                <input value={this.state.password} onChange={this.onInputChange} name="password" id="login-password" className="border-bottom-grey padding-top-tiny padding-bottom-tiny u-inlineblock" />
              </div>
              <input type="submit" />
            </form>
          </div>
        </div>
      </section>
    );
  }
};
