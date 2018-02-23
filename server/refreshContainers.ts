import docker from './dockerAPI';

const refreshContainers = async (io: SocketIO.Server) => {
  try {
    const containers = await docker.listContainers({ all: true });
    io.emit('containers.list', containers);
  } catch (err) {
    throw err;
  }
};

export default refreshContainers;
