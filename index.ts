import * as express from 'express';
import * as bodyParser from 'body-parser';

import {apiRoutes} from './src/routes/api';

const app = express();
app.use(bodyParser.json());

app.use('/api', apiRoutes);

const port = process.env['PORT'] || 8080;
app.listen(port, () => {
  console.log('server running on ' + port);
});
