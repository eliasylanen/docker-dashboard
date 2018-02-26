import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as socketIo from 'socket.io';

import socketConnection from './socketIO';
import refreshContainers from './refreshContainers';

const startServer = async (port: number) => {
  const app = express();

  app
    .use(express.static('dist/client'))
    .get(
      '/',
      async (req: express.Request, res: express.Response) =>
        await res.sendFile(path.resolve(__dirname, 'index.html'))
    );

  const server = new http.Server(app);
  const io = socketIo(server);

  try {
    await socketConnection(io);
    await setInterval(() => refreshContainers(io), 2000);
    await server.listen(port);
    console.log(`Server listening on ${port}`);
  } catch (err) {
    console.error(err);
  }
};

export default startServer;
