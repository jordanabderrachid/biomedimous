import * as express from 'express';
import * as bodyParser from 'body-parser';

import {apiRoutes} from './src/routes/api';

const app = express();
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.listen(8080, () => {
  console.log('server running on 8080');
});
