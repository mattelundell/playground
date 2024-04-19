import { StackContext, Queue, EventBus } from 'sst/constructs';

export function EventStack({ stack }: StackContext) {
  const transformationQueue = new Queue(stack, 'ImageTransformationQueue', {});

  const deletionQueue = new Queue(stack, 'ImageDeletionQueue', {});

  const eventbus = new EventBus(stack, 'ImageTransformerBus', {});
}
