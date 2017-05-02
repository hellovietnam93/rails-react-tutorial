import React from 'react';
import ReactOnRails from 'react-on-rails';
import Errors from 'shareds/errors';
import * as app_constants from 'constants/app_constants';
import * as post_constants from '../../posts/post_constants';
import * as comment_constants from '../comment_constants';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.comment ? props.comment.content : '',
      errors: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      content: nextProps.comment ? nextProps.comment.content : '',
      errors: null
    }
  }

  render() {
    return (
      <form className={`comment-form comment-form-${this.props.post_id}`}
        onSubmit={this.onSubmit.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className='input-group'>
          <input type='text' className='content-input form-control'
            placeholder={I18n.t('comments.labels.content')}
            value={this.state.content}
            onChange={this.handleChange.bind(this)} />
          <span className='input-group-btn'>
            <button className='btn btn-primary'>
              {I18n.t('buttons.send')}
            </button>
          </span>
        </div>
      </form>
    );
  }

  handleChange(event) {
    this.setState({content: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    let comment = {
      content: this.state.content
    }

    let url = app_constants.APP_URL + post_constants.POSTS_PATH +
      this.props.post_id + '/' + comment_constants.COMMENTS_PATH;
    let method = 'POST';
    if (this.props.comment) {
      url += this.props.comment.id;
      method = 'PUT';
    }
    $.ajax({
      url: url,
      type: method,
      dataType: 'json',
      data: {
        comment: comment,
        authenticity_token: ReactOnRails.authenticityToken()
      },
      success: (data) => {
        this.setState({content: '', errors: null});
        if (this.props.comment) {
          this.props.handleAfterUpdatedComment(data.comment);
        } else {
          this.props.handleAfterCreatedComment(data.comment);
        }
      },
      error: (data) => {
        this.setState({errors: data.responseJSON.errors});
      }
    });
  }
}
