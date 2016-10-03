import dynamodb from '../providers/dynamodb';
import tokenStore from '../stores/token';
import User from '../models/user';

const USER_TABLE_NAME = 'biomedimous-users';

function save(user: User, cb: (err: Error | null) => void): void {
  const params = {
      TableName: USER_TABLE_NAME,
      Item: user.toJSON()
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      console.log(err);
      cb(new Error('user-service: failed to save user'));
      return;
    }

    cb(null);
  });
}

function get(email: string, cb: (err: Error | null, user?: User) => void): void {
  const params = {
    TableName: USER_TABLE_NAME,
    Key: {
      email: email
    }
  };

  dynamodb.get(params, (err, data) => {
    if (err) {
      cb(new Error('user-service: failed to get user'));
      return;
    }

    if (!data.Item) {
      cb(null);
      return;
    }

    cb(null, User.fromJSON(data.Item));
  });
}

export function createUser(email: string, password: string, cb: (err: Error | null) => void): void {
  const user = new User(email, password);
  save(user, cb);
}

export function authenticate(email: string, password: string, cb: (err: Error | null, user?: User) => void): void {
  get(email, (err, user) => {
    if (err) {
      console.log(err);
      cb(new Error('user-service: failed to get user'));
      return;
    }

    if (!user || !user.checkPassword(password)) {
      cb(null);
      return;
    }

    cb(null, user);
  });
}

export function createToken(user: User, cb: (err: Error | null, token?: string) => void): void {
  tokenStore.addUser(user, (err, token) => {
    if (err || !token) {
      cb(new Error('user-service: failed to create token'));
      return;
    }

    cb(null, token);
  });
}
