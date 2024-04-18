import { SSTConfig } from 'sst';
import { API } from './stacks/api';

export default {
  config(_input) {
    return {
      name: 'image-transformer',
      region: 'eu-north-1',
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
