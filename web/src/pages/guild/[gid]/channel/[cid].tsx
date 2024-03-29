import React from 'react';
import { graphql } from 'relay-runtime';
import { GetServerSideProps } from 'next';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { Flex } from '@ui/Flex';
import { Text } from '@ui/Text';
import { Header } from '@ui/Header';
import { getToken } from 'auth/getToken';
import { Separator } from '@ui/Separator';
import { getPreloadedQuery } from 'relay/network';
import { Layout } from 'components/Layout/Layout';
import { GuildLayout } from 'components/Layout/GuildLayout';
import { ChannelFeed } from 'components/Channel/ChannelFeed';
import { NextPageWithLayout } from 'relay/ReactRelayContainer';
import layoutQuery, { LayoutQuery } from '__generated__/LayoutQuery.graphql';
import pageQuery, { Cid_ChannelQuery } from '__generated__/Cid_ChannelQuery.graphql';
import nestedLayoutQuery, { GuildLayoutQuery } from '__generated__/GuildLayoutQuery.graphql';

const ChannelQuery = graphql`
  query Cid_ChannelQuery($id: String!, $first: Int!, $after: String) {
    channel(id: $id) {
      name
      description
      ...ChannelFeedFragment
    }
  }
`;

interface ChannelProps {
  queryRefs: {
    layoutQuery: PreloadedQuery<LayoutQuery>;
    pageQuery: PreloadedQuery<Cid_ChannelQuery>;
    nestedLayoutQuery: PreloadedQuery<GuildLayoutQuery>;
  };
}

const Channel: NextPageWithLayout<ChannelProps> = ({ queryRefs }: ChannelProps) => {
  const data = usePreloadedQuery(ChannelQuery, queryRefs.pageQuery);

  if (!data || !data.channel) {
    return null;
  }

  const { channel } = data;

  return (
    <Flex direction='column' grow>
      <Header>
        <Flex align='center' gap={3}>
          <Text variant='p3' weight='semibold'>
            {channel.name}
          </Text>
          <Separator orientation='vertical' />
          <Text color='lowContrast'>{channel.description}</Text>
        </Flex>
      </Header>
      <ChannelFeed fragmentKey={data.channel} />
    </Flex>
  );
};

Channel.getLayout = page => {
  return (
    <Layout queryRef={page.props.queryRefs.layoutQuery}>
      <GuildLayout queryRef={page.props.queryRefs.nestedLayoutQuery}>{page}</GuildLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers);

  // If user isn't logged in redirect
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
      props: {},
    };
  }

  const id = context.params?.cid as string;
  const guildId = context.params?.gid as string;

  if (!id || !guildId) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }

  return {
    props: {
      preloadedQueries: {
        pageQuery: await getPreloadedQuery(pageQuery, { id, first: 10, after: null }, token),
        layoutQuery: await getPreloadedQuery(layoutQuery, { first: 10 }, token),
        nestedLayoutQuery: await getPreloadedQuery(
          nestedLayoutQuery,
          {
            id: guildId,
            first: null,
          },
          token,
        ),
      },
    },
  };
};

export default Channel;
