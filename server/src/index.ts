import { createServer } from 'http';

import { app } from './app';
import { config } from './config';
import { connectDatabase } from './database';

(async () => {
  await connectDatabase();

  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    // eslint-disable-next-line
    console.log(`Server running on port:${config.PORT}`);
  });
})();
