import type { User } from '@/types/user';
import UserModel from '@/models/User';

export default class UserRepository {
  static create(user: User) {
    return UserModel.create(user);
  }

  static findByDoc(doc: string) {
    return UserModel.findOne({
      doc
    });
  }
}
