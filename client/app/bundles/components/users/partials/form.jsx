import React from 'react';
import ReactOnRails from 'react-on-rails';
import Errors from 'shareds/errors';
import * as app_constants from 'constants/app_constants';
import * as user_constants from '../user_constants';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: null
    }
  }

  render() {
    let username = this.props.user ? this.props.user.username : '';
    return (
      <form onSubmit={this.onSubmitForm.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className='form-group'>
          <label>{I18n.t('users.labels.username')}</label>
          <input type='text' className='form-control' defaultValue={username}
            ref='username' />
        </div>
        <div className='form-group'>
          <label>{I18n.t('users.labels.password')}</label>
          <input type='password' className='form-control' ref='password' />
        </div>
        <div className='form-group'>
          <label>{I18n.t('users.labels.password_confirmation')}</label>
          <input type='password' className='form-control'
            ref='password_confirmation' />
        </div>
        <div className='text-right'>
          <button className='btn btn-primary'>
            {I18n.t('buttons.submit')}
          </button>
        </div>
      </form>
    );
  }

  onSubmitForm(event) {
    event.preventDefault();
    let user = {
      username: this.refs.username.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.password_confirmation.value
    }

    let url = app_constants.APP_URL + user_constants.USERS_PATH;
    let type = 'POST';
    if (this.props.user) {
      url += this.props.user.id;
      type = 'PUT';
    }

    $.ajax({
      url: url,
      type: type,
      dataType: 'json',
      data: {
        user: user,
        authenticity_token: ReactOnRails.authenticityToken()
      },
      success: (data) => {
        if (this.props.user) {
          this.props.handleAfterUpdated(data.user);
        } else {
          sessionStorage.setItem('current_user', JSON.stringify(data.user));
          window.location.href = url + data.user.id
        }
      },
      error: (data) => {
        this.setState({errors: data.responseJSON.errors});
      }
    });
  }
}
