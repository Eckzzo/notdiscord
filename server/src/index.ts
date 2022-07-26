import http from 'http';

import { WebSocketServer } from 'ws';
import { execute, subscribe } from 'graphql';
import { useServer } from 'graphql-ws/lib/use/ws';

import { app } from './app';
import { config } from './config';
import { schema } from './schema/schema';
import { getContext } from './getContext';
import { connectDatabase } from './database';

(async () => {
  await connectDatabase();

  const server = http.createServer(app.callback());

  server.listen(config.PORT, () => {
    // eslint-disable-next-line
    console.log(`Server running on port:${config.PORT}`);
    const wsServer = new WebSocketServer({ server, path: '/subscriptions' });
    useServer(
      {
        context: async () => getContext({ user: null }),
        schema,
        execute,
        subscribe,
      },
      wsServer,
    );
  });
})();
