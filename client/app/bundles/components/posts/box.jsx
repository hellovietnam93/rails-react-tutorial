import React from 'react';
import Form from './partials/form';
import css from 'assets/sass/posts.scss';
import Posts from './posts';

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
}
