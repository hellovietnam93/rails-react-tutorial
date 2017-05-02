import React from 'react';
import Post from './partials/post';
import ModalEditPost from './partials/modal_edit_post';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null
    }
  }

  render() {
    return (
      <div>
        {this.renderPosts()}
        <ModalEditPost post={this.state.post}
          handleAfterUpdatedPost={this.handleAfterUpdatedPost.bind(this)} />
      </div>
    );
  }

  renderPosts() {
    return this.props.posts.map(post => {
     return (
        <Post key={post.id} post={post} editPost={this.editPost.bind(this)}
          handleAfterDeletedPost={this.props.handleAfterDeletedPost}
          handleAfterUpdatedComment={this.props.handleAfterUpdatedComment}
          handleAfterCreatedComment={this.props.handleAfterCreatedComment}
          handleAfterDeletedComment={this.props.handleAfterDeletedComment}
        />
      );
    });
  }

  editPost(post) {
    this.setState({post: post});
    $('.modal-edit-post').modal();
  }

  handleAfterUpdatedPost(post) {
    this.setState({post: null});
    this.props.handleAfterUpdatedPost(post);
  }
}
