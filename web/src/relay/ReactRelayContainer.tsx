import { NextPage } from 'next';
import { Suspense, useMemo } from 'react';
import { ReactRelayContext, useRelayEnvironment } from 'react-relay';

import { createEnvironment } from './environment';

type NextPageWithLayout<T> = NextPage<T> & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export function ReactRelayContainer<T>({
	Component,
	props,
}: {
	Component: NextPageWithLayout<T>;
	props: any;
}) {
	const environment = useMemo(() => createEnvironment(), []);
	return (
		<ReactRelayContext.Provider value={{ environment }}>
			<Suspense fallback={null}>
				<Hyderate Component={Component} props={props} />
			</Suspense>
		</ReactRelayContext.Provider>
	);
}

function Hyderate<T>({
	Component,
	props,
}: {
	Component: NextPageWithLayout<T>;
	props: any;
}) {
	const environment = useRelayEnvironment();

	const getLayout = Component.getLayout ?? ((page) => page);

	const transformedProps = useMemo(() => {
		if (props == null) {
			return props;
		}
		const { preloadedQueries, ...otherProps } = props;
		if (preloadedQueries == null) {
			return props;
		}

		const queryRefs: any = {};
		for (const [queryName, { params, variables, response }] of Object.entries(
			preloadedQueries
		) as any) {
			environment
				.getNetwork()
				// @ts-ignore - seems to be a private untyped api 🤷‍♂️
				.responseCache.set(params.id, variables, response);
			// TODO: create using a function exported from react-relay package
			queryRefs[queryName] = {
				environment,
				fetchKey: params.id,
				fetchPolicy: 'store-or-network',
				isDisposed: false,
				name: params.name,
				kind: 'PreloadedQuery',
				variables,
			};
		}

		return { ...otherProps, queryRefs };
	}, [props]);

	return <>{getLayout(<Component {...transformedProps} />)}</>;
}

export type { NextPageWithLayout };
