import ICacheProvider from '@providers/cache/i-cache-provider';
import IFindAllProvidersDTO from '@providers/repositories/dtos/i-find-all-providers';
import IUserRepository from '@providers/repositories/i-user-repository';
import { UserEntity } from '@entities/userEntity';

class ListProvidersUseCase {
  private userRepository: IUserRepository;

  private cacheProvider: ICacheProvider;

  constructor(userRepository: IUserRepository, cacheProvider: ICacheProvider) {
    this.userRepository = userRepository;
    this.cacheProvider = cacheProvider;
  }

  public async perform({
    excludeUserId,
  }: IFindAllProvidersDTO): Promise<UserEntity[]> {
    let providers = await this.cacheProvider.recovery<UserEntity[]>(
      `list-providers:${excludeUserId}`,
    );
    if (!providers) {
      providers = await this.userRepository.findAllProviders({ excludeUserId });

      await this.cacheProvider.save(
        `list-providers:${excludeUserId}`,
        providers,
      );
    }

    return providers;
  }
}

export default ListProvidersUseCase;
