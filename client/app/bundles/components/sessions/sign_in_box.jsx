import React from 'react';
import ReactOnRails from 'react-on-rails';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';
import * as session_constants from './session_constants';
import * as user_constants from '../users/user_constants';

export default class SignInBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: null
    }
  }

  render() {
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h1 className='text-center'>{I18n.t('sessions.new.title')}</h1>
        <form onSubmit={this.onSubmitForm.bind(this)}>
          <Errors errors={this.state.errors} />
          <div className='form-group'>
            <label>{I18n.t('sessions.labels.username')}</label>
            <input type='text' className='form-control' ref='username' />
          </div>
          <div className='form-group'>
            <label>{I18n.t('sessions.labels.password')}</label>
            <input type='password' className='form-control' ref='password' />
          </div>
          <div className='text-right'>
            <button className='btn btn-primary'>
              {I18n.t('buttons.submit')}
            </button>
          </div>
        </form>
      </div>
    );
  }

  onSubmitForm(event) {
    event.preventDefault();
    let session = {
      username: this.refs.username.value,
      password: this.refs.password.value,
    }
    let sign_in_url = app_constants.APP_URL + session_constants.SIGN_IN_PATH;
    $.ajax({
      url: sign_in_url,
      type: 'POST',
      dataType: 'json',
      data: {
        session: session,
        authenticity_token: ReactOnRails.authenticityToken()
      },
      success: (data) => {
        localStorage.setItem('current_user', JSON.stringify(data.user));
        let users_url = app_constants.APP_URL + user_constants.USERS_PATH;
        window.location.href = users_url + data.user.id
      },
      error: (data) => {
        this.setState({errors: data.responseJSON.errors});
      }
    });
  }
}
