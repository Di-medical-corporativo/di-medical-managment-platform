import bcrypt from "bcrypt"
import { UserPassword } from "./UserPassword";
const SALT_ROUNDS = 10;

export class UserPasswordEncryptor {
  run(password: string) {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);

    return new UserPassword(hash, salt);
  }
}
