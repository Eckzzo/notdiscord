import { FILTER_CONDITION_TYPE, getObjectId } from '@entria/graphql-mongo-helpers';

const MessageFilterMapping = {
  location: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
};

export { MessageFilterMapping };
