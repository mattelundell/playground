import { StackContext, Api, EventBus } from 'sst/constructs';

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'ImgTransformApi', {});
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
