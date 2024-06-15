import { SSTConfig } from 'sst';
import { API } from './stacks/api';
import { StorageStack } from './stacks/storage';
import { EventStack } from './stacks/events';

export default {
  config(_input) {
    return {
      name: 'image-transformer',
      region: 'eu-north-1',
    };
  },
  stacks(app) {
    app.stack(StorageStack);
    app.stack(EventStack);
    app.stack(API);
  },
} satisfies SSTConfig;
