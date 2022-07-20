import { createLoader } from '@entria/graphql-mongo-helpers';

import { GuildModel } from './GuildModel';
import { registerLoader } from '../loader/loaderRegister';

const {
	Wrapper: Guild,
	getLoader,
	clearCache,
	load,
	loadAll,
} = createLoader({
	model: GuildModel,
	loaderName: 'GuildLoader',
});

registerLoader('GuildLoader', getLoader);

export { Guild, getLoader, clearCache, load, loadAll };
