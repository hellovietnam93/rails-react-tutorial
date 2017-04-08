import React from 'react';
import ReactOnRails from 'react-on-rails';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';
import * as user_constants from './user_constants';

export default class SignUpBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: null
    }
  }

  render() {
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h1 className='text-center'>{I18n.t('users.new.title')}</h1>
        <form onSubmit={this.onSubmitForm.bind(this)}>
          <Errors errors={this.state.errors} />
          <div className='form-group'>
            <label>{I18n.t('users.labels.username')}</label>
            <input type='text' className='form-control' ref='username' />
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
      </div>
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
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: {
        user: user,
        authenticity_token: ReactOnRails.authenticityToken()
      },
      success: (data) => {
        window.location.href = url + data.user.id
      },
      error: (data) => {
        this.setState({errors: data.responseJSON.errors});
      }
    });
  }
}
