import * as React from 'react';

import ContainerListItem from './ContainerListItem';

import { Container, ContainerList } from '../types';

export default class extends React.Component<ContainerList> {
  mapContainers = (containers: Array<Container>) =>
    containers.map((value: Container) => (
      <ContainerListItem key={value.id} {...value} />
    ));
  render() {
    const { title, containers } = this.props;

    return (
      <section className="container">
        <h3>{title}</h3>
        {containers.length < 1 ? (
          <p>No containers to show</p>
        ) : (
          <div className="row">{this.mapContainers(containers)}</div>
        )}
      </section>
    );
  }
}
