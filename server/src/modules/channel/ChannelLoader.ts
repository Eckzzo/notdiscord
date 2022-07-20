import { createLoader } from '@entria/graphql-mongo-helpers';

import { ChannelModel } from './ChannelModel';
import { registerLoader } from '../loader/loaderRegister';

const {
	Wrapper: Channel,
	getLoader,
	clearCache,
	load,
	loadAll,
} = createLoader({
	model: ChannelModel,
	loaderName: 'ChannelLoader',
});

registerLoader('ChannelLoader', getLoader);

export { Channel, getLoader, clearCache, load, loadAll };
