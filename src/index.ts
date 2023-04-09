import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import apicache from 'apicache';

import api from './routes/api.js';

const app = express();

let cache = apicache.middleware;

app.get('/', (req, res) => {
  res.json({
    message: 'Nothing to see here.'
  });
});

app.use('/api', cache('60 minutes'), api);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://127.0.0.1:${PORT}`);
});
