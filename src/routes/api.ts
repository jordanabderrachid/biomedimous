import {Router} from 'express';

import {authRoutes} from './auth';

export let apiRoutes = Router()
  .use('/auth', authRoutes);
