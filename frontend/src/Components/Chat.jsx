/* eslint-disable functional/no-expression-statements,
functional/no-conditional-statements,
consistent-return, no-param-reassign,
react-hooks/exhaustive-deps */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';

import socket from '../utils/socket';
import routes from '../utils/routes';
import MessageForm from './MessageForm';
import Channels from './Channels';
import Messages from './Messages';
import getAuthHeader from '../utils/getAuthHeader';
import renderModal from './modals/renderModal';
import useNetErrToast from './hooks/useNetErrToast';

import { actions as messagesActions, selectors as msgsSelectors } from '../slices/messagesSlice';
import { actions as channelsActions, selectors as channelsSelectors } from '../slices/channelsSlice';

const Chat = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const [curChannelId, setCurChannelId] = useState(null);
  const currentChannel = useSelector((state) => channelsSelectors.selectById(state, curChannelId));
  const chatHeader = currentChannel ? currentChannel.name : 'default';
  const msgs = useSelector(msgsSelectors.selectAll);
  const curChannelMsgs = msgs.filter((msg) => msg.channelId === curChannelId);
  const user = localStorage.getItem('username');

  const displayNetErr = useNetErrToast();

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });

  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(channelsActions.renameChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    if (payload.id === curChannelId) {
      setCurChannelId(1);
    }
    dispatch(channelsActions.removeChannel(payload.id));
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        dispatch(channelsActions.addChannels(data.channels));
        dispatch(messagesActions.addMessages(data.messages));
        setCurChannelId(data.currentChannelId);
      } catch (error) {
        rollbar.error('Error fetching data', error, { user });
        displayNetErr();
      }
    };

    fetchContent();
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col md="2" className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('main.channels')}</b>
            <button className="p-0 text-primary btn btn-group-vertical" type="button" onClick={() => showModal('adding')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <Channels
            curChannelId={curChannelId}
            setCurChannelId={setCurChannelId}
            showModal={showModal}
          />
          {renderModal({ modalInfo, hideModal, setCurChannelId })}
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #&nbsp;
                  {chatHeader}
                </b>
              </p>
              <span className="text-muted">
                {t('chatHeaderMsgs.msg', { count: curChannelMsgs.length })}
              </span>
            </div>
            <Messages curChannelId={curChannelId} />
            <MessageForm curChannelId={curChannelId} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
