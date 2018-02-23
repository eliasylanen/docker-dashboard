import docker from './dockerAPI';
import refreshContainers from './refreshContainers';

const socketConnection = async (io: SocketIO.Server) => {
  io.on('connection', socket => {
    socket.on('containers.list', async () => await refreshContainers(io));
    socket.on(
      'container.control',
      async ({ id, event }: { id: string; event: string }) => {
        const container: any = await docker.getContainer(id);
        if (!!container) {
          try {
            await container[event]();
            await refreshContainers(io);
          } catch (err) {
            throw err;
          }
        }
      }
    );
    socket.on('image.run', async ({ name }) => {
      try {
        const container = await docker.createContainer({ Image: name });
        await container.start();
      } catch (err) {
        socket.emit('image.error', { message: err });
      }
    });
  });
};

export default socketConnection;
