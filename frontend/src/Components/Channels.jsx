/* eslint-disable functional/no-expression-statements, no-param-reassign */

import { Nav } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';
import ChannelItem from './CnannelItem';

import { selectors as channelsSelectors } from '../slices/channelsSlice';

const Channels = (props) => {
  const {
    curChannelId, setCurChannelId, showModal,
  } = props;
  const channels = useSelector(channelsSelectors.selectAll);
  const handleClick = (id) => setCurChannelId(id);

  if (channels.length === 0) {
    return null;
  }

  return (
    <Nav variant="pills" fill="true" as="ul" id="channels-box" className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => {
        const key = channel.id;
        return (
          <Nav.Item key={key} as="li" className="w-100">
            <ChannelItem
              channel={channel}
              handleClick={handleClick}
              showModal={showModal}
              curChannelId={curChannelId}
            />
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

export default Channels;
