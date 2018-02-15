import express from 'express';
import path from 'path';
import http from 'http';

const createServer = async (port: Number) => {
  const app: express.Application = express();

  app
    .use(express.static('public'))
    .get(
      '/',
      async (req: express.Request, res: express.Response) =>
        await res.sendFile(path.join(__dirname, 'index.html'))
    );

  const server: http.Server = new http.Server(app);

  await server.listen(port);
  console.log(`Server listening on ${port}`);
};

export default createServer;
