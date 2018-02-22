import * as React from 'react';
import * as classNames from 'classnames';
import * as io from 'socket.io-client';

import { Container } from '../types';

const socket = io.connect();

export default class extends React.Component<Container> {
  isRunning = () => {
    const { state } = this.props;
    return state === 'running';
  };

  startContainer = () => {
    const { id } = this.props;
    const event = this.isRunning() ? 'stop' : 'start';
    socket.emit('container.toggle', { id, event });
  };
  render() {
    const { state, name, status, image } = this.props;

    const panelClass = this.isRunning() ? 'Succes' : 'Default';
    const classes = classNames('panel', `panel-${panelClass}`);
    const buttonText = this.isRunning() ? 'Stop' : 'Start';

    return (
      <div className="col-sm-3">
        <div className={classes}>
          <div className="panel-heading">{name}</div>
          <div className="panel-body">
            Status: {status}
            <br />
            Image: {image}
          </div>
          <div className="panel-footer">
            <button className="btn btn-default" onClick={this.startContainer}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
