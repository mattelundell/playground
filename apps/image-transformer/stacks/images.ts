import { StackContext, Function, use } from 'sst/constructs';
import { StorageStack } from './storage';

export function ImageStack({ stack }: StackContext) {
  const Storage = use(StorageStack);
  const uploadImage = new Function(stack, 'UploadImageFun', {
    handler: 'src/functions/uploadImage.handler',
    bind: [Storage.originalImages, Storage.transformedImages],
    permissions: ['s3:putItem'],
  });

  const transformImage = new Function(stack, 'TransformImageFun', {
    handler: 'src/functions/transformImage.handler',
    bind: [Storage.originalImages, Storage.transformedImages],
    permissions: ['s3:putItem'],
  });

  const deleteImage = new Function(stack, 'DeleteImageFun', {
    handler: 'src/functions/deleteImage.handler',
    bind: [Storage.originalImages, Storage.transformedImages],
    permissions: ['s3:deleteItem'],
  });

  const downloadImage = new Function(stack, 'DownloadImagFune', {
    handler: 'src/functions/downloadImage.handler',
    bind: [Storage.originalImages, Storage.transformedImages],
    permissions: ['s3:getItem'],
  });
}
