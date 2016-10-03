import * as crypto from 'crypto';

import User from '../models/user';

const TOKEN_SIZE_IN_BYTES = 32;
const TOKEN_DIGEST_TYPE = 'hex';

class TokenStore {
  private users: {[key: string]: User}

  constructor() {
    this.users = {}
  }

  private generateToken(): string {
    return crypto.randomBytes(TOKEN_SIZE_IN_BYTES).toString(TOKEN_DIGEST_TYPE);
  }

  public addUser(user: User, cb: (err: Error | null, token?: string) => void): void {
    const token = this.generateToken();
    this.users[token] = user;
    process.nextTick(cb.bind(null, null, token));
  }

  public getUser(token: string, cb: (err: Error | null, user?: User) => void): void {
    if (!this.users.hasOwnProperty(token)) {
      process.nextTick(cb.bind(null, null));
      return;
    }

    process.nextTick(cb.bind(null, null, this.users[token]));
  }
}

let instance: TokenStore | undefined;

function getInstance(): TokenStore {
  if (!instance) {
    instance = new TokenStore();
  }

  return instance;
}

export default getInstance();
