/* eslint-disable functional/no-expression-statements,
functional/no-conditional-statements, no-param-reassign */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import socket from '../../utils/socket';
import { selectors } from '../../slices/channelsSlice';

const Remove = (props) => {
  const { id, onHide } = props;
  const { error, setError } = useState(false);
  const curChannel = useSelector((state) => selectors.selectById(state, id));

  const handleClick = (currentId) => {
    socket.emit('removeChannel', { id: currentId }, async (response) => {
      const { status } = await response;
      if (status === 'ok') {
        onHide();
      } else {
        setError(true);
      }
    });
  };

  const buttonRef = useRef();
  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          Удалить канал&nbsp;
          {curChannel.name ?? 'default'}
          &nbsp;?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => onHide()}>Отменить</Button>
          <Button variant="primary" onClick={() => handleClick(id)} ref={buttonRef}>Удалить</Button>
        </div>
        {error ? <div className="text-danger">Ошибка сети, повторите ошибку позже</div> : null}
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
