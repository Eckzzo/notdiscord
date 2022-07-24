import { GetServerSidePropsContext } from 'next/types';
import { ConcreteRequest } from 'relay-runtime';

// WIP for new relay fetch with better Typing
// SSR forces you to pass even 'nullable' arguments to work,
// Like "after" on a connection, even if it's a optional argument,
// if not provided  this will not hit the cache on hydration,
// so you _must_ explicitly pass it as null, you must not leave it as undefined
// this typing makes it required to pass a generic with the query type to the function
// and makes all the variables required, so should make easier to avoid mistakes

interface RelayQuery {
	response: unknown extends Record<string, unknown> ? unknown : unknown;
	variables: unknown extends Record<string, unknown> ? unknown : unknown;
}

async function getSSRPreloadedQuery<
	Query extends RelayQuery = never,
	Q extends Query = Query
>(
	{ params }: ConcreteRequest,
	variables: Required<Q['variables']>,
	context: GetServerSidePropsContext
) {}
