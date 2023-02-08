/* eslint-disable no-shadow */
import { users } from '@prisma/client';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';
import IUserRepository from '../IUserRepository';

class FakeUsersRepository implements IUserRepository {
  private users: users[] = [];

  async save(data: users): Promise<users> {
    const index = this.users.findIndex(
      user => user.id === data.id || user.email === data.email,
    );

    if (index === -1) {
      this.users.push(data);
    } else {
      this.users[index] = data;
    }

    return data;
  }

  async findByEmail(email: string): Promise<users | null> {
    const user = this.users.find(item => item.email === email);

    if (!user) return null;

    return user;
  }

  async findById(id: string): Promise<users | null> {
    const user = this.users.find(item => item.id === id);

    if (!user) return null;

    return user;
  }

  async findAllProviders({
    excludeUserId,
  }: IFindAllProvidersDTO): Promise<users[]> {
    let { users } = this;

    if (excludeUserId) {
      users = this.users.filter(user => user.id !== excludeUserId);
    }

    return users;
  }
}

export default FakeUsersRepository;
