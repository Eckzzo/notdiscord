interface Dataloaders {
	UserLoader: ReturnType<typeof import('../user/UserLoader').getLoader>;
	GuildLoader: ReturnType<typeof import('../guild/GuildLoader').getLoader>;
	ChannelLoader: ReturnType<
		typeof import('../channel/ChannelLoader').getLoader
	>;
	FriendshipLoader: ReturnType<
		typeof import('../friendship/FriendshipLoader').getLoader
	>;
}

type Loaders =
	| { [Name in keyof Dataloaders]: () => Dataloaders[Name] }
	| Record<string, () => unknown>;

const loaders: Loaders = {};

const registerLoader = <Name extends keyof Dataloaders>(
	key: Name,
	getLoader: () => Dataloaders[Name]
) => {
	loaders[key] = getLoader;
};

const getDataloaders = (): Dataloaders =>
	(Object.keys(loaders) as (keyof Dataloaders)[]).reduce(
		(prev, loaderKey) => ({
			...prev,
			[loaderKey]: loaders[loaderKey](),
		}),
		{}
	) as Dataloaders;

export type { Dataloaders };
export { registerLoader, getDataloaders };
