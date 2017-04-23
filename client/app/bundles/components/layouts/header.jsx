import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as session_constants from '../sessions/session_constants';
import * as user_constants from '../users/user_constants';

export default class Header extends React.Component {
  render() {
    let root_url = app_constants.APP_URL;
    let navbar_right = null;
    if (localStorage.current_user) {
      let user = JSON.parse(localStorage.current_user);
      let user_url = root_url + user_constants.USERS_PATH + user.id;
      navbar_right = (
        <ul className='nav navbar-nav navbar-right'>
          <li className='dropdown'>
            <a href='#' className='dropdown-toggle' data-toggle='dropdown'>
              {I18n.t('layouts.header.account')} <b className='caret'></b>
            </a>
            <ul className='dropdown-menu'>
              <li>
                <a href={user_url}>{I18n.t('layouts.header.profile')}</a>
              </li>
              <li><a href={user_url + '/edit'}>
                {I18n.t('layouts.header.settings')}</a></li>
              <li className='divider'></li>
              <li><a href='#' onClick={this.logOut.bind(this)}>
                {I18n.t('layouts.header.log_out')}</a></li>
            </ul>
          </li>
        </ul>
      );
    } else {
      let sign_in_url = root_url + session_constants.SIGN_IN_PATH;
      navbar_right = (
        <ul className='nav navbar-nav navbar-right'>
          <li>
            <a href={sign_in_url}>{I18n.t('layouts.header.login')}</a>
          </li>
        </ul>
      );
    }

    return (
      <header className='header navbar navbar-fixed-top navbar-inverse'>
        <div className='container'>
          <a href={root_url} className='logo'>
            {I18n.t('layouts.header.logo_title')}
          </a>
          <nav>
            {navbar_right}
          </nav>
        </div>
      </header>
    );
  }

  logOut(event) {
    event.preventDefault();
    let log_out_url = app_constants.APP_URL + session_constants.LOG_OUT_PATH;
    $.ajax({
      url: log_out_url,
      type: 'DELETE',
      dataType: 'json',
      data: {
        authenticity_token: ReactOnRails.authenticityToken()
      },
      success: (data) => {
        localStorage.removeItem('current_user');
        let sign_in_url = app_constants.APP_URL +
          session_constants.SIGN_IN_PATH;
        window.location.href = sign_in_url;
      },
      error: (data) => {
        alert(I18n.t('messages.something_went_wrong'));
      }
    });
  }
}
