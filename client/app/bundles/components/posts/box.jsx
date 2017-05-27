import css from 'assets/sass/posts.scss';
import Form from './partials/form';
import Posts from './posts';
import React from 'react';

export default class PostBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: props.posts
    }
  }

  render() {
    return (
      <div className='col-md-12 posts'>
        <div className='row'>
          <div className='col-md-4'>
            <Form
              handleAfterCreatedPost={this.handleAfterCreatedPost.bind(this)}
            />
          </div>
          <div className='col-md-8'>
            <Posts posts={this.state.posts}
              handleAfterDeletedPost={this.handleAfterDeletedPost.bind(this)}
              handleAfterUpdatedPost={this.handleAfterUpdatedPost.bind(this)}
              handleAfterUpdatedComment=
                {this.handleAfterUpdatedComment.bind(this)}
              handleAfterCreatedComment=
                {this.handleAfterCreatedComment.bind(this)}
              handleAfterDeletedComment=
                {this.handleAfterDeletedComment.bind(this)}
              handleAfterLikedPost={this.handleAfterLikedPost.bind(this)}
              handleAfterUnlikedPost={this.handleAfterUnlikedPost.bind(this)}
              handleAfterLikedComment={this.handleAfterLikedComment.bind(this)}
              handleAfterUnlikedComment=
                {this.handleAfterUnlikedComment.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }

  handleAfterCreatedPost(post) {
    this.state.posts.unshift(post);
    this.setState({posts: this.state.posts});
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
    Object.assign(this.state.posts[index].comments[comment_index], comment);
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

  handleAfterLikedPost(like) {
    let index = this.state.posts
      .findIndex(post_ => post_.id == like.objectable_id);
    this.state.posts[index].likes.push(like);
    this.setState({posts: this.state.posts});
  }

  handleAfterUnlikedPost(like) {
    let index = this.state.posts
      .findIndex(post_ => post_.id == like.objectable_id);
    let like_index = this.state.posts[index].likes.findIndex(like_ => {
      return like_.id == like.id;
    });
    this.state.posts[index].likes.splice(like_index, 1);
    this.setState({posts: this.state.posts});
  }

  handleAfterLikedComment(comment, like) {
    let post_index = this.state.posts
      .findIndex(post_ => post_.id == comment.post_id);
    let comment_index = this.state.posts[post_index].comments
      .findIndex(comment_ => comment_.id == like.objectable_id);
    this.state.posts[post_index].comments[comment_index].likes.push(like);
    this.setState({posts: this.state.posts});
  }

  handleAfterUnlikedComment(comment, like) {
    let post_index = this.state.posts
      .findIndex(post_ => post_.id == comment.post_id);
    let comment_index = this.state.posts[post_index].comments
      .findIndex(comment_ => comment_.id == like.objectable_id);
    let like_index = this.state.posts[post_index].comments[comment_index].likes
      .findIndex(like_ => like_.id == like.id);
    this.state.posts[post_index].comments[comment_index].likes
      .splice(like_index, 1);
    this.setState({posts: this.state.posts});
  }
}
