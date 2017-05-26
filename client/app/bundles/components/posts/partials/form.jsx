import React from 'react';
import ReactOnRails from 'react-on-rails';
import Errors from 'shareds/errors';
import * as app_constants from 'constants/app_constants';
import * as post_constants from '../post_constants';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      errors: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      content: nextProps.post ? nextProps.post.content : '',
      errors: null
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className='form-group'>
          <label>{I18n.t('posts.labels.content')}</label>
          <textarea className='form-control resize-y'
            value={this.state.content}
            onChange={this.handleChange.bind(this)}></textarea>
        </div>
        <div className='text-right'>
          <button className='btn btn-primary'>
            {I18n.t('buttons.post')}
          </button>
        </div>
      </form>
    );
  }

  handleChange(event) {
    this.setState({content: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    let post = {
      content: this.state.content
    }

    let url = app_constants.APP_URL + post_constants.POSTS_PATH;
    let method = 'POST';
    if (this.props.post) {
      url += this.props.post.id;
      method = 'PUT';
    }
    $.ajax({
      url: url,
      type: method,
      dataType: 'json',
      data: {
        post: post,
        authenticity_token: ReactOnRails.authenticityToken()
      },
      success: (data) => {
        this.setState({content: '', errors: null});
        if (this.props.post) {
          $('.modal-edit-post').modal('hide');
          this.props.handleAfterUpdatedPost(data.post);
        } else {
          this.props.handleAfterCreatedPost(data.post);
        }
      },
      error: (data) => {
        this.setState({errors: data.responseJSON.errors});
      }
    });
  }
}
