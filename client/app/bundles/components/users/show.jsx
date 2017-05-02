import React from 'react';
import Posts from '../posts/posts';

export default class UserShowBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: props.posts
    }
  }

  render() {
    return (
      <div className='col-md-12'>
        <h1 className='text-center'>{this.props.user.username}</h1>
        <div className='posts'>
          <Posts posts={this.state.posts}
            handleAfterDeletedPost={this.handleAfterDeletedPost.bind(this)}
            handleAfterUpdatedPost={this.handleAfterUpdatedPost.bind(this)}
            handleAfterUpdatedComment=
              {this.handleAfterUpdatedComment.bind(this)}
            handleAfterCreatedComment=
              {this.handleAfterCreatedComment.bind(this)}
            handleAfterDeletedComment=
              {this.handleAfterDeletedComment.bind(this)}
          />
        </div>
      </div>
    );
  }

  handleAfterUpdatedPost(post) {
    let index = this.state.posts.findIndex(post_ => post_.id == post.id);
    Object.assign(this.state.posts[index], post);
    this.setState({posts: this.state.posts});
  }

  handleAfterDeletedPost(post) {
    let index = this.state.posts.findIndex(post_ => post_.id == post.id);
    this.state.posts.splice(index, 1);
    this.setState({posts: this.state.posts});
  }

  handleAfterUpdatedComment(comment) {
    let index = this.state.posts.findIndex(post_ => post_.id == comment.post_id);
    let comment_index = this.state.posts[index].comments.findIndex(comment_ => {
      return comment_.id == comment.id;
    });
    this.state.posts[index].comments[comment_index] = comment;
    this.setState({posts: this.state.posts});
  }

  handleAfterCreatedComment(comment) {
    let index = this.state.posts.findIndex(post_ => post_.id == comment.post_id);
    this.state.posts[index].comments.push(comment);
    this.setState({posts: this.state.posts});
  }

  handleAfterDeletedComment(comment) {
    let index = this.state.posts.findIndex(post_ => post_.id == comment.post_id);
    let comment_index = this.state.posts[index].comments.findIndex(comment_ => {
      return comment_.id == comment.id;
    });
    this.state.posts[index].comments.splice(comment_index, 1);
    this.setState({posts: this.state.posts});
  }
}
