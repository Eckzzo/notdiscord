const slugToGuildChannelInput = (slug?: string[]) => {
  if (!slug || slug.length !== 2) {
    return null;
  }
  const guildId = slug[0];

  if (!guildId || typeof guildId !== 'string') {
    return null;
  }

  const channelId = slug[1];

  if (!channelId || typeof channelId !== 'string') {
    return null;
  }

  return {
    guildId,
    channelId,
  };
};

export { slugToGuildChannelInput };
