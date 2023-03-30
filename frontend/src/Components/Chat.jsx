/* eslint-disable functional/no-expression-statements, consistent-return, no-param-reassign */

import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Row, Col, Nav, Button,
} from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';
import { Manager } from 'socket.io-client';

import routes from '../routes';
import { mountData, refreshMessages } from '../slices/dataReducer';
import MessageForm from './MessageForm';

const host = window.location.href;
const manager = new Manager(host);
const socket = manager.socket('/');

const handleMessageSubmit = async (values, channelId, username, state) => {
  const message = { ...values, ...{ channelId, username } };
  await socket.timeout(1000).emit('newMessage', message, async (err) => {
    state.values.body = err ? state.values.body : '';
  });
};

const renderChannelList = (channelList) => {
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

const renderMessagesList = (messagesList) => {
  if (messagesList) {
    return (
      <div id="messages-box" className="overflow-auto px-5">
        {messagesList.map((message) => {
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
  }
  return null;
};

const getAuthHeader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return {};
};

const getChatHeader = (channelList, curChannelId) => {
  if (curChannelId) {
    const currentChannelName = channelList.filter((channel) => channel.id === curChannelId)[0].name;
    return `# ${currentChannelName}`;
  }
  return '# default';
};

const Chat = () => {
  const channelsData = useSelector((state) => state.chatDataLoader.channelsData);
  const { channels, currentChannelId, messages } = channelsData;
  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => {
    dispatch(refreshMessages(payload));
  });

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      dispatch(mountData(data));
    };

    fetchContent();
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col md="2" className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button className="p-o text-primary btn btn-group-vertical" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          {renderChannelList(channels)}
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-o"><b>{getChatHeader(channels, currentChannelId)}</b></p>
              <span className="text-muted">
                {messages ? messages.length : 0}
                &nbsp;сообщений
              </span>
            </div>
            {renderMessagesList(messages)}
            <MessageForm handleMessageSubmit={handleMessageSubmit} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
