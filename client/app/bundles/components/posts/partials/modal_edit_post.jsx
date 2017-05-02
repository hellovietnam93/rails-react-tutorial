import React from 'react';
import Form from './form';

export default class ModalEditPost extends React.Component {
  render() {
    return (
      <div className='modal fade in modal-edit-post' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {I18n.t('posts.edit.title')}
              </h4>
            </div>

            <div className='modal-task'>
              <div className='modal-body'>
                <Form post={this.props.post}
                  handleAfterUpdatedPost={this.props.handleAfterUpdatedPost} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
