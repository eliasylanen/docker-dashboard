import createServer from './server';

const port = (process.env.PORT || 3000) as Number;
createServer(port);
