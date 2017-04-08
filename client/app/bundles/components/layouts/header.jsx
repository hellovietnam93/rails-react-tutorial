import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as session_constants from '../sessions/session_constants';

export default class Header extends React.Component {
  render() {
    let root_url = app_constants.APP_URL;
    let sign_in_url = root_url + session_constants.SIGN_IN_PATH;
    return (
      <header className='header navbar navbar-fixed-top navbar-inverse'>
        <div className='container'>
          <a href={root_url} className='logo'>
            {I18n.t('layouts.header.logo_title')}
          </a>
          <nav>
            <ul className='nav navbar-nav navbar-right'>
              <li><a href={sign_in_url}>
                {I18n.t('layouts.header.login')}
              </a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
