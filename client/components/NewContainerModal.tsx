import * as React from 'react';
import * as classNames from 'classnames';

import Modal from './Modal';
import { ModalProperties } from '../types';

interface ModalState {
  imageName: string;
  isValid: boolean;
}

export default class NewContainerModal extends React.Component<
  ModalProperties,
  ModalState
> {
  state = {
    imageName: '',
    isValid: false,
  };

  runImage = () => {
    console.log(this.props, this.state);
    const { props: { onRunImage }, state: { isValid, imageName } } = this;
    if (isValid && onRunImage) {
      onRunImage(imageName);
    }

    return this.state.isValid;
  };

  onImageNameChange = (e: any) => {
    const name = e.target.value;

    this.setState({
      imageName: name,
      isValid: name.length > 0,
    });
  };

  render() {
    const { isValid } = this.state;
    const inputClass = classNames({
      'form-group': true,
      'has-error': !isValid,
    });

    return (
      <Modal
        id="newContainerModal"
        buttonText="Run"
        title="Create a new container"
        onButtonClicked={this.runImage}
        isValid={isValid}
      >
        <form className="form-horizontal" method="dialog">
          <div className={inputClass}>
            <label htmlFor="imageName" className="col-sm-3 control-label">
              Image name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                onChange={this.onImageNameChange}
                id="imageName"
                placeholder="e.g mongodb:latest"
              />
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}
