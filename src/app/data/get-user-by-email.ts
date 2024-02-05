import { UserFinder } from '@/modules/User/application/UserFinder';
import { MongoUserRepository } from '@/modules/User/infrastructure/persistence/MongoUserRepository';

export const getUserByEmail = async (email: string) => {
  const userFinder = new UserFinder(new MongoUserRepository());
  return userFinder.run(email);
};
