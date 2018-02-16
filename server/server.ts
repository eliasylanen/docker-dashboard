import * as express from 'express';
import * as path from 'path';
import * as http from 'http';

const startServer = async (port: Number) => {
  const app: express.Application = express();

  app
    .use(express.static('dist'))
    .get(
      '/',
      async (req: express.Request, res: express.Response) =>
        await res.sendFile(path.resolve(__dirname, '..', 'index.html'))
    );

  const server: http.Server = new http.Server(app);
  try {
    await server.listen(port);
    console.log(`Server listening on ${port}`);
  } catch (err) {
    console.error(err);
  }
};

export default startServer;
