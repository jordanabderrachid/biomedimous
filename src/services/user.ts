import dynamodb from '../providers/dynamodb';
import User from '../models/user';

const USER_TABLE_NAME = 'biomedimous-users';

export function save(user: User, cb: (err: Error | null) => void): void {
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

export function get(email: string, cb: (err: Error | null, user?: User) => void): void {
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
      cb(new Error('user-service: user not found'));
      return;
    }

    cb(null, User.fromJSON(data.Item));
  });
}

export function createUser(email: string, password: string, cb: (err: Error | null) => void): void {
  const user = new User(email, password);
  save(user, cb);
}
