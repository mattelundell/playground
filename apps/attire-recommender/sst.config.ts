import { SSTConfig } from 'sst';
import { API } from './stacks/api';

export default {
  config(_input) {
    return {
      name: 'attire-recommender',
      region: 'eu-north-1',
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
