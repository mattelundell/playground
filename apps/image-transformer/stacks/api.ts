import { StackContext, Api, Function, use } from 'sst/constructs';
import { StorageStack } from './storage';

export function API({ stack }: StackContext) {
  const Storage = use(StorageStack);

  const api = new Api(stack, 'ImgTransformApi', {
    routes: {
      'POST /images': 'src/functions/uploadImage.handler',
      'PUT /images/{imageId}': 'src/functions/transformImage.handler',
      'DELETE /images/{imageId}': 'src/functions/deleteImage.handler',
      'GET /images/{imageId}': 'src/functions/downloadImage.handler',
    },
  });

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

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
