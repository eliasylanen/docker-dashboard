import * as React from 'react';
import * as classNames from 'classnames';

export interface Container {
  id: String;
  name: String;
  image: String;
  state: String;
  status: String;
}

export class ContainerListItem extends React.Component<Container> {
  render() {
    const { state, status, image } = this.props;
    const isRunning = state === 'running';

    const panelClass = isRunning ? 'Succes' : 'Default';
    const classes = classNames('panel', `panel-${panelClass}`);
    const buttonText = isRunning ? 'Stop' : 'Start';

    return (
      <div className="col-sm-3">
        <div className={classes}>
          <div className="panel-heading">{this.props.name}</div>
          <div className="panel-body">
            Status: {status}
            <br />
            Image: {image}
          </div>
          <div className="panel-footer">
            <button className="btn btn-default">{buttonText}</button>
          </div>
        </div>
      </div>
    );
  }
}
