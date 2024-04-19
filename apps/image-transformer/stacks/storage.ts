import { StackContext, Bucket } from 'sst/constructs';

export function StorageStack({ stack }: StackContext) {
  const originalImages = new Bucket(stack, 'OriginalImageBucket', {});

  const transformedImages = new Bucket(stack, 'TransformedImageBucket', {});
}
