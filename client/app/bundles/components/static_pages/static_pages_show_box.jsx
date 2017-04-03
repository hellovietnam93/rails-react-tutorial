import React from 'react';

require('../../assets/sass/static_pages.scss');

export default class StaticPagesShowBox extends React.Component {
  render() {
    return (
      <div className='home-page text-center jumbotron'>
        <h1 className='title'>{I18n.t('static_pages.show.welcome')}</h1>

        <h2 className='description'>{I18n.t('static_pages.show.description')}</h2>

        <a href='#' className='btn btn-lg btn-primary'>
          {I18n.t('static_pages.show.sign_up')}
        </a>
      </div>
    );
  }
}
