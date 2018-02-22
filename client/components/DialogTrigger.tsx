import * as React from 'react';

interface DialogTriggerProperties {
  id: string;
  buttonText: string;
}

export default class DialogTrigger extends React.Component<
  DialogTriggerProperties
> {
  render() {
    const { id } = this.props;

    return (
      <button
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#${id}`}
      >
        {this.props.buttonText}
      </button>
    );
  }
}
