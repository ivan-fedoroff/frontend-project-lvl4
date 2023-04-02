/* eslint-disable functional/no-expression-statements, no-param-reassign */

import { Nav, Button } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectors as msgsSelectors } from '../slices/messagesSlice';
import { selectors as channelsSelectors } from '../slices/channelsSlice';

const Channels = ({ setCurChannelId, setCurChannelMsgs }) => {
  const channels = useSelector(channelsSelectors.selectAll);
  const msgs = useSelector(msgsSelectors.selectAll);
  const handleClick = (channel) => {
    setCurChannelId(channel.id);
    setCurChannelMsgs(msgs.filter((msg) => msg.channelId === channel.id));
  };

  if (channels.length === 0) {
    return null;
  }

  return (
    <Nav variant="pills" fill="true" as="ul" id="channels-box" className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => {
        const key = channel.id;
        return (
          <Nav.Item key={key} as="li" className="w-100">
            <Button
              variant="secondary"
              className="w-100 rounded-0 text-start"
              type="button"
              onClick={() => handleClick(channel)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

export default Channels;
