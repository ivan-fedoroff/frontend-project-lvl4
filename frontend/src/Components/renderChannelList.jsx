import { Nav, Button } from 'react-bootstrap';

const renderChannelList = (channelList, channelsData, handleClick) => {
  if (channelList) {
    return (
      <Nav variant="pills" fill="true" as="ul" id="channels-box" className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
        {channelList.map((channel) => {
          const key = channel.id;
          return (
            <Nav.Item key={key} as="li" className="w-100">
              <Button
                variant="secondary"
                className="w-100 rounded-0 text-start"
                type="button"
                onClick={() => handleClick(channel, channelsData)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
            </Nav.Item>
          );
        })}
      </Nav>
    );
  }
  return null;
};

export default renderChannelList;
