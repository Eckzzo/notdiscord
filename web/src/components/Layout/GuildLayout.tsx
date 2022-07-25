import React, { Fragment } from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { ChatBubbleIcon, PlusIcon, RocketIcon } from '@radix-ui/react-icons';

import { Text } from '@ui/Text';
import { Flex } from '@ui/Flex';
import { Header } from '@ui/Header';
import { LinkButton } from '@ui/LinkButton';
import { SubNav, SubNavButton } from './SubNav';
import { AddChannelDialog } from 'components/Guild/AddChannelDialog';
import { GuildInviteDialog } from 'components/Guild/GuildInviteDialog';
import { GuildLayoutQuery as GuildLayoutQueryType } from '__generated__/GuildLayoutQuery.graphql';

const GuildLayoutQuery = graphql`
  query GuildLayoutQuery($id: String!, $first: Int) {
    guild(id: $id) {
      id
      name
      ...GuildInviteDialogFragment
      channels(first: $first) @connection(key: "GuildConnection_channels", filters: ["guildId"]) {
        ...AddChannelDialogFragment
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

interface GuildLayoutProps {
  children?: React.ReactNode;
  queryRef: PreloadedQuery<GuildLayoutQueryType>;
}

const GuildLayout: React.FC<GuildLayoutProps> = ({ children, queryRef }) => {
  const data = usePreloadedQuery<GuildLayoutQueryType>(GuildLayoutQuery, queryRef);

  if (!data.guild) {
    return null;
  }

  const { guild } = data;

  return (
    <Fragment>
      <SubNav>
        <Header>
          <Text weight='semibold'>{guild.name}</Text>
        </Header>
        <Flex gap={2} direction='column' css={{ py: '$3', px: '$2', borderBottom: '1px solid $gray300' }}>
          <AddChannelDialog fragmentKey={guild.channels} guildId={guild.id}>
            <SubNavButton>
              <PlusIcon />
              Add Channel
            </SubNavButton>
          </AddChannelDialog>
          <GuildInviteDialog fragmentKey={guild}>
            <SubNavButton>
              <RocketIcon />
              Invite to Guild
            </SubNavButton>
          </GuildInviteDialog>
        </Flex>
        <Flex direction='column' css={{ py: '$4', px: '$2' }} gap={2} grow>
          <Flex align='center' justify='between'>
            <Text variant='cap' weight='semibold' css={{ px: '$3' }} spaced uppercase>
              Channels
            </Text>
          </Flex>
          {data.guild.channels.edges.map(edge => {
            return (
              <LinkButton
                variant='secondary'
                size='md'
                href={`/guild/${guild.id}/channel/${edge?.node?.id}`}
                key={`channel_${edge?.node?.id}`}
                isFullWidth
              >
                <ChatBubbleIcon />
                {edge?.node?.name}
              </LinkButton>
            );
          })}
        </Flex>
      </SubNav>
      {children}
    </Fragment>
  );
};

export { GuildLayout };
