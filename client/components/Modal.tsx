import * as React from 'react';

import { ModalProperties } from '../types';

export default class extends React.Component<ModalProperties> {
  onPrimaryButtonClick() {
    const { onButtonClicked } = this.props;
    !!onButtonClicked && onButtonClicked();
  }

  render() {
    const { id, title, children, buttonText, isValid } = this.props;

    return (
      <div className="modal fade" id={id}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={this.onPrimaryButtonClick}
                className={`btn ${isValid ? 'btn-primary' : 'btn-disabled'}`}
              >
                {buttonText || 'Ok'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
