import React from 'react';
import ReactOnRails from 'react-on-rails';
import Form from './partials/form';

export default class SignUpBox extends React.Component {
  render() {
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h1 className='text-center'>{I18n.t('users.new.title')}</h1>
        <Form />
      </div>
    );
  }
}
