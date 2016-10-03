import * as crypto from 'crypto';

const SALT_SIZE_IN_BYTES = 32;
const SALT_DIGEST_TYPE = 'hex';
const HASH_ALGORITHM = 'sha256';
const HASH_DIGEST_TYPE = 'hex';

enum UserType{Basic, Moderator, Admin};

interface UserJSON {
  email: string;
  salt: string;
  passwordHashed: string;
  type: UserType;
}

class User {
  private salt: string;
  private passwordHashed: string;
  public type: UserType;

  constructor(public email: string, password?: string, type?: UserType) {
    this.type = type || UserType.Basic;

    if (password) {
      this.salt = this.generateSalt();
      this.passwordHashed = this.hashPassword(password, this.salt);
    }
  }

  private generateSalt(): string {
    return crypto.randomBytes(SALT_SIZE_IN_BYTES).toString(SALT_DIGEST_TYPE);
  }

  private hashPassword(password: string, salt: string): string {
    const hash = crypto.createHash(HASH_ALGORITHM);
    hash.update(password + salt);

    return hash.digest().toString();
  }

  private setSalt(salt: string): void {
    this.salt = salt;
  }

  private setPasswordHashed(passwordHashed: string): void {
    this.passwordHashed = passwordHashed;
  }

  private setType(type: UserType): void {
    this.type = type;
  }

  public static fromJSON(json: UserJSON): User {
    let user = new User(json.email);
    user.setSalt(json.salt);
    user.setPasswordHashed(json.passwordHashed);
    user.setType(json.type);
    return user;
  }

  public toJSON(): UserJSON {
    return {
      email: this.email,
      salt: this.salt,
      passwordHashed: this.passwordHashed,
      type: this.type
    };
  }

  public checkPassword(password: string): boolean {
    return this.passwordHashed === this.hashPassword(password, this.salt);
  }
}

export default User;
