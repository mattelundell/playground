import { StackContext, Queue, EventBus, Function, use } from 'sst/constructs';
import { StorageStack } from './storage';

export function EventStack({ stack }: StackContext) {
  const Storage = use(StorageStack);

  // TRANSFORMATION
  const transformationQueue = new Queue(stack, 'ImageTransformationQueue', {});

  const transformationConsumer = new Function(
    stack,
    'ImageTransformationConsumer',
    {
      bind: [Storage.transformedImages],
      handler: 'src/functions/queues/transformationQueue.handler',
      permissions: ['s3:putItem'],
    },
  );
  transformationQueue.addConsumer(stack, transformationConsumer);

  // DELETION
  const deletionQueue = new Queue(stack, 'ImageDeletionQueue', {});

  const deletionConsumer = new Function(stack, 'ImageDelitionConsumer', {
    bind: [Storage.originalImages, Storage.transformedImages],
    handler: 'src/functions/queues/deletionQueue.handler',
    permissions: ['s3:deleteItem'],
  });

  deletionQueue.addConsumer(stack, deletionConsumer);

  // COOMPLETION
  const eventbus = new EventBus(stack, 'ImageTransformerBus', {});

  eventbus.addRules(stack, {
    TransformationCompleted: {
      pattern: {},
      targets: {},
    },
  });
}
