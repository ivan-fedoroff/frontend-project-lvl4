const getChatHeader = (channelList, curChannelId) => {
  if (curChannelId) {
    const currentChannelName = channelList.filter((channel) => channel.id === curChannelId)[0].name;
    return `# ${currentChannelName}`;
  }
  return '# default';
};

export default getChatHeader;
