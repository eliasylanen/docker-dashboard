import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as socketIo from 'socket.io';

import docker from './dockerAPI';

const refreshContainers = async (io: SocketIO.Server) => {
  try {
    const containers = await docker.listContainers({ all: true });
    io.emit('containers.list', containers);
  } catch (err) {
    throw err;
  }
};

const socketConnetion = async (io: SocketIO.Server) => {
  io.on('connection', socket => {
    socket.on('containers.list', async () => await refreshContainers(io));
    socket.on(
      'container.toggle',
      async ({ id, event }: { id: string; event: string }) => {
        const container: any = docker.getContainer(id);
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

const startServer = async (port: number) => {
  const app = express();

  app
    .use(express.static('dist'))
    .get(
      '/',
      async (req: express.Request, res: express.Response) =>
        await res.sendFile(path.resolve(__dirname, '..', 'index.html'))
    );

  const server = new http.Server(app);
  const io = socketIo(server);

  try {
    await socketConnetion(io);
    await setInterval(() => refreshContainers(io), 2000);
    await server.listen(port);
    console.log(`Server listening on ${port}`);
  } catch (err) {
    console.error(err);
  }
};

export default startServer;
