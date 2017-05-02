import React from 'react';
import Form from './partials/form';

export default class UserEditBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    }
  }

  render() {
    let user = sessionStorage.current_user
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h1 className='text-center'>{I18n.t('users.edit.title')}</h1>
        <Form user={this.state.user}
          handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
      </div>
    );
  }

  handleAfterUpdated(user) {
    alert(I18n.t('messages.updated_success'));
    this.setState({user: user});
  }
}
