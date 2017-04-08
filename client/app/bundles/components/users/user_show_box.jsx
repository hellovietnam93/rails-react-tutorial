import React from 'react';

export default class UserShowBox extends React.Component {
  render() {
    return (
      <div className='col-md-12'>
        <h1 className='text-center'>{this.props.user.username}</h1>
      </div>
    );
  }
}
