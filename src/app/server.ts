import express, { Express } from 'express';
import cors from 'cors';

import userRoutes from './routes/user-routes';
import urlRoutes from './routes/url-routes';

const makeServer = (): Express => {
  const server = express();

  server.use(cors());
  server.use(express.json());

  server.use(userRoutes);
  server.use(urlRoutes);

  return server;
};

const port = parseInt(process.env.PORT as string) || 8080;

const server = makeServer();

server.listen(port, () => {
  console.log(`[SERVER]> Server running at port ${port}`);
});