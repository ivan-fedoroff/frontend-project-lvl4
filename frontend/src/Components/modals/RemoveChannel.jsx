import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import socket from '../../utils/socket';
import { selectors } from '../../slices/channelsSlice';
import useNetErrToast from '../hooks/useNetErrToast';

const Remove = (props) => {
  const { id, onHide } = props;
  const { t } = useTranslation();
  const curChannel = useSelector((state) => selectors.selectById(state, id));

  const displaySuccess = () => {
    /* eslint-disable functional/no-expression-statements */
    toast.success(t('feedback.successRemoving'));
    /* eslint-enable */
  };

  const displayNetErr = useNetErrToast();

  const handleClick = (currentId) => {
    /* eslint-disable functional/no-expression-statements, functional/no-conditional-statements */
    socket.emit('removeChannel', { id: currentId }, async (response) => {
      const { status } = await response;
      if (status === 'ok') {
        displaySuccess();
        onHide();
      } else {
        displayNetErr();
      }
    });
    /* eslint-enable */
  };

  const buttonRef = useRef();
  /* eslint-disable functional/no-expression-statements */
  useEffect(() => {
    buttonRef.current.focus();
  }, []);
  /* eslint-enable */

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          {t('titles.remove')}
          {curChannel.name ?? 'default'}
          &nbsp;?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => onHide()}>{t('buttons.escape')}</Button>
          <Button variant="danger" onClick={() => handleClick(id)} ref={buttonRef}>{t('buttons.removeChannel')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
