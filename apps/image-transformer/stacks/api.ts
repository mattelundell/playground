import { StackContext, Api } from 'sst/constructs';

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'ImgTransformApi', {
    routes: {
      'POST /images': 'src/functions/uploadImage.handler',
      'PUT /images/{imageId}': 'src/functions/transformImage.handler',
      'DELETE /images/{imageId}': 'src/functions/deleteImage.handler',
      'GET /images/{imageId}': 'src/functions/downloadImage.handler',
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
