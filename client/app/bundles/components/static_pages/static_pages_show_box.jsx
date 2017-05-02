import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as user_constants from '../users/user_constants';
import css from 'assets/sass/static_pages.scss';

export default class StaticPagesShowBox extends React.Component {
  render() {
    let sign_up_url = app_constants.APP_URL + user_constants.SIGN_UP_PATH;
    return (
      <div className='home-page text-center jumbotron'>
        <h1 className='title'>{I18n.t('static_pages.show.welcome')}</h1>

        <h2 className='description'>
          {I18n.t('static_pages.show.description')}
        </h2>

        <a href={sign_up_url} className='btn btn-lg btn-primary'>
          {I18n.t('static_pages.show.sign_up')}
        </a>
      </div>
    );
  }
}
