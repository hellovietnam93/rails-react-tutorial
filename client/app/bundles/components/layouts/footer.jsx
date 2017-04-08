import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <footer className='footer'>
        <small>
          {I18n.t('layouts.footer.description')}
        </small>
        <small className='pull-right'>
          {I18n.t('layouts.footer.contributors')}
        </small>
      </footer>
    );
  }
}
