import Comment from './partials/comment';
import Form from './partials/form';
import React from 'react';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({comment: null});
  }

  render() {
    return (
      <div className='comments'>
        {this.renderComments()}
        <Form post_id={this.props.post_id} comment={this.state.comment}
          handleAfterUpdatedComment={this.props.handleAfterUpdatedComment}
          handleAfterCreatedComment={this.props.handleAfterCreatedComment}
        />
      </div>
    );
  }

  renderComments() {
    return this.props.comments.map(comment => {
     return (
        <Comment key={comment.id} comment={comment}
          onEditComment={this.onEditComment.bind(this)}
          handleAfterDeletedComment={this.props.handleAfterDeletedComment}
        />
      );
    });
  }

  onEditComment(comment) {
    this.setState({comment: comment});
    $('.comment-form-' + comment.post_id).find('.content-input').focus();
  }
}
