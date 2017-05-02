import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as post_constants from '../post_constants';

export default class Posts extends React.Component {
  render() {
    return (
      <div className='post'>
        <p className='username'>{this.props.post.user.username}</p>
        <p>{this.props.post.content}</p>
        {this.renderActions()}
      </div>
    );
  }

  renderActions() {
    let user = JSON.parse(sessionStorage.current_user);
    if (user && user.id == this.props.post.user_id) {
      return (
        <p className='actions'>
          <a href='#' onClick={this.editPost.bind(this, this.props.post)}>
            {I18n.t('buttons.edit')}
          </a>
          &nbsp;
          <a href='#' onClick={this.deletePost.bind(this, this.props.post)}>
            {I18n.t('buttons.delete')}
          </a>
        </p>
      );
    }
    return null;
  }

  editPost(post, event) {
    event.preventDefault();
    this.props.editPost(post);
  }

  deletePost(post, event) {
    event.preventDefault();
    if (confirm(I18n.t('messages.confirm'))) {
      let url = app_constants.APP_URL + post_constants.POSTS_PATH + post.id;
      $.ajax({
        url: url,
        type: 'DELETE',
        dataType: 'json',
        data: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        success: (data) => {
          this.props.handleAfterDeletedPost(post);
        },
        error: (data) => {
          console.log(data);
        }
      });
    }
  }
}
