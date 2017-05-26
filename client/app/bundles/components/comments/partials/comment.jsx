import * as app_constants from 'constants/app_constants';
import * as comment_constants from '../comment_constants';
import * as post_constants from '../../posts/post_constants';
import * as user_constants from '../../users/user_constants';
import React from 'react';

export default class Comment extends React.Component {
  render() {
    let user_url = app_constants.APP_URL + user_constants.USERS_PATH +
      this.props.comment.user.id;
    return (
      <div className='comment'>
        <p className='comment-header'>
          <a href={user_url}
            className='username'>{this.props.comment.user.username}</a>
          {this.renderActions()}
        </p>
        <p>{this.props.comment.content}</p>
        {this.renderUserActions()}
      </div>
    );
  }

  renderActions() {
    let user = JSON.parse(sessionStorage.current_user);
    if (user && user.id == this.props.comment.user_id) {
      return (
        <span className='pull-right'>
          <a href='#'
            onClick={this.editComment.bind(this)}>
            {I18n.t('buttons.edit')}
          </a>
          &nbsp;
          <a href='#'
            onClick={this.deleteComment.bind(this)}>
            {I18n.t('buttons.delete')}
          </a>
        </span>
      );
    }
    return null;
  }

  renderUserActions() {
    let user = JSON.parse(sessionStorage.current_user);
    if (user && user.id == this.props.comment.user_id) {
      return (
        <p className='actions'>
          <a href='#'>
            {I18n.t('buttons.like')}
          </a>
        </p>
      );
    }
    return null;
  }

  editComment(event) {
    event.preventDefault();
    this.props.onEditComment(this.props.comment);
  }


  deleteComment(event) {
    event.preventDefault();
    if (confirm(I18n.t('messages.confirm'))) {
      let url = app_constants.APP_URL + post_constants.POSTS_PATH +
        this.props.comment.post_id + '/' + comment_constants.COMMENTS_PATH +
        this.props.comment.id;
      $.ajax({
        url: url,
        type: 'DELETE',
        dataType: 'json',
        data: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        success: (data) => {
          this.props.handleAfterDeletedComment(this.props.comment);
        },
        error: (data) => {
          console.log(data);
        }
      });
    }
  }
}
