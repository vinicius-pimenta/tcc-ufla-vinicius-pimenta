import ICacheProvider from '@providers/cache/i-cache-provider';
import RedisCacheProvider from '@providers/cache/impl/redis-cache-provider';

export const makeIoredis = (): ICacheProvider => {
  return new RedisCacheProvider();
};
