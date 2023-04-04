import React from 'react';
import { useSelector } from 'react-redux';

import { selectors } from '../slices/messagesSlice';

const Messages = ({ curChannelId }) => {
  const curChannelMsgs = useSelector(selectors.selectAll)
    .filter((msg) => msg.channelId === curChannelId);
  if (curChannelMsgs.length === 0) {
    return null;
  }
  return (
    <div id="messages-box" className="overflow-auto px-5">
      {curChannelMsgs.map((message) => {
        const key = message.id;
        return (
          <div key={key} className="text-break mb-2">
            <b>{message.username}</b>
            :&nbsp;
            {message.body}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
