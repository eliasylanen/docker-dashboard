import startServer from './server';

const port = (process.env.PORT || 3000) as Number;
startServer(port);
