import S3StorageProvider from '@providers/storage/impl/s3-storage-provider';

export const makeS3Storage = (): S3StorageProvider => {
  return new S3StorageProvider();
};
