import React from 'react';

const Messages = ({ curChannelMsgs }) => {
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
