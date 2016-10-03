import {Router} from 'express';

import * as authController from '../controllers/auth';

export const authRoutes = Router()
  .put('/', authController.createUser)
  .post('/', authController.authenticateUser);
