import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import React from 'react';

const renderChannelName = (name) => {
  const normalizeName = name.length > 15 ? `${name.slice(0, 13)}...` : name;
  return normalizeName;
};

const renderButton = (handleClick, channel, curChannelId) => (
  <Button
    variant={curChannelId === channel.id ? 'secondary' : 'none'}
    className="w-100 rounded-0 text-start"
    type="button"
    onClick={() => handleClick(channel.id)}
  >
    <span className="me-1">#</span>
    {renderChannelName(channel.name)}
  </Button>
);

const ChannelItem = (props) => {
  const {
    curChannelId, channel, handleClick, showModal,
  } = props;
  if (channel.removable) {
    return (
      <Dropdown as={ButtonGroup} className="d-flex" role="group">
        {renderButton(handleClick, channel, curChannelId)}

        <Dropdown.Toggle variant="none" split className="flex-grow-0">
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            role="button"
            tabIndex="0"
            href="#"
            onClick={() => showModal('renaming', channel.id)}
          >
            Переименовать
          </Dropdown.Item>
          <Dropdown.Item
            role="button"
            tabIndex="0"
            href="#"
            onClick={() => showModal('removing', channel.id)}
          >
            Удалить
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  return renderButton(handleClick, channel, curChannelId);
};

export default ChannelItem;
