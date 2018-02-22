import * as Docker from 'dockerode';

const isWindows = process.platform === 'win32';

let options: Docker.DockerOptions;

!!isWindows
  ? (options = {
      host: '127.0.0.1',
      port: 2375,
    })
  : (options = {
      socketPath: '/var/run/docker.sock',
    });

export default new Docker(options);
