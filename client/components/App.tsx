import * as React from 'react';
import * as io from 'socket.io-client';
import * as Docker from 'dockerode';

import ContainerListItem from './ContainerListItem';
import ContainerItemList from './ContainerItemList';
import NewContainerModal from './NewContainerModal';
import DialogTrigger from './DialogTrigger';

import { Container } from '../types';

interface AppState {
  containers: Array<Container>;
  stoppedContainers: Array<Container>;
}

const socket = io.connect();

const mapContainer = (container: Docker.ContainerInfo): Container => ({
  id: container.Id,
  name: container.Names.map((n: string) => n.substr(1)).join(', '),
  state: container.State,
  status: `${container.State} (${container.Status})`,
  image: container.Image,
});

export default class extends React.Component<{}, AppState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      containers: [],
      stoppedContainers: [],
    };

    socket.on('containers.list', (containers: Array<Docker.ContainerInfo>) => {
      const mappedContainers = containers.map(mapContainer);
      this.setState(() => ({
        containers: mappedContainers.filter(
          ({ state }: Container) => state === 'running'
        ),
        stoppedContainers: mappedContainers.filter(
          ({ state }: Container) => state !== 'running'
        ),
      }));
    });
    socket.on('image.error', (args: any) => {
      alert(args.message.json.message);
    });
  }

  onRunImage = (name: String) => {
    socket.emit('image.run', { name });
  };

  componentDidMount() {
    socket.emit('containers.list');
  }
  render() {
    const { containers, stoppedContainers } = this.state;
    return (
      <div className="container">
        <h1 className="page-header">Docker Dashboard</h1>
        <DialogTrigger id="newContainerModal" buttonText="New container" />
        <ContainerItemList title="Running" containers={containers} />
        <ContainerItemList
          title="Stopped containers"
          containers={stoppedContainers}
        />

        <NewContainerModal
          id="newContainerModal"
          onRunImage={this.onRunImage}
        />
      </div>
    );
  }
}
