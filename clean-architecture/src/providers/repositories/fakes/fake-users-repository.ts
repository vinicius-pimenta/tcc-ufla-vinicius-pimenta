import { UserEntity } from '@entities/userEntity';
import IFindAllProvidersDTO from '../dtos/i-find-all-providers';
import IUserRepository from '../i-user-repository';

class FakeUsersRepository implements IUserRepository {
  private users: UserEntity[] = [];

  async save(data: UserEntity): Promise<UserEntity> {
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

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find(e => e.email === email);

    if (!user) return null;

    return user;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = this.users.find(e => e.id === id);

    if (!user) return null;

    return user;
  }

  async findAllProviders({
    excludeUserId,
  }: IFindAllProvidersDTO): Promise<UserEntity[]> {
    let { users } = this;

    // this.users.forEach(user => console.log(user.id));

    if (excludeUserId) {
      // console.log(users);
      // console.log('aqui');
      // this.users.forEach(user => console.log(user.id));
      users = this.users.filter(user => user.id !== excludeUserId);
      // console.log(users);
    }

    return users;
  }
}

export default FakeUsersRepository;
