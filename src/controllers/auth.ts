import {Request, Response, NextFunction} from 'express';
import {ParsedAsJson} from 'body-parser';

import * as userService from '../services/user';

export const createUser = function(req: Request & ParsedAsJson, res: Response, next: NextFunction): any {
  if (!validateUserRequestBody(req.body)) {
    res.status(400).end();
    return;
  }

  userService.createUser(req.body.email, req.body.password, (err) => {
    if (err) {
      res.status(500).end();
      return;
    }

    res.status(200).end();
  });
}

function validateUserRequestBody(body: any): boolean {
  if (!(body instanceof Object)) {
    return false;
  }

  if (body.hasOwnProperty('email') || body.hasOwnProperty('password')) {
    return false;
  }

  return true;
}
