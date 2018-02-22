import startServer from './server';

const port = (process.env.PORT || 3000) as number;
startServer(port);
