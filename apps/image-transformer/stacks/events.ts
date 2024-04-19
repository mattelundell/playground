import { StackContext, Queue, EventBus, Function } from 'sst/constructs';

export function EventStack({ stack }: StackContext) {
  // TRANSFORMATION
  const transformationQueue = new Queue(stack, 'ImageTransformationQueue', {});

  const transformationConsumer = new Function(
    stack,
    'ImageTransformationConsumer',
    {
      handler: 'src/functions/consumers/transformation.handler',
    },
  );
  transformationQueue.addConsumer(stack, transformationConsumer);

  // DELETION
  const deletionQueue = new Queue(stack, 'ImageDeletionQueue', {});

  const deletionConsumer = new Function(stack, 'ImageDelitionConsumer', {
    handler: 'src/functions/consumers/deletion.handler',
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
