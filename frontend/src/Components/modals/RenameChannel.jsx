import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import socket from '../../utils/socket';
import { selectors } from '../../slices/channelsSlice';

const Rename = (props) => {
  const { id, onHide } = props;
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const curChannel = useSelector((state) => selectors.selectById(state, id));

  const displaySuccess = () => {
    /* eslint-disable functional/no-expression-statements */
    toast.success(t('feedback.successRenaming'));
    /* eslint-enable */
  };

  const formik = useFormik({
    initialValues: { name: curChannel.name },
    validate: (values) => {
      const errors = {};
      if (channels.findIndex((channel) => channel.name === values.name) >= 0) {
        /* eslint-disable functional/no-expression-statements */
        errors.name = t('feedback.errorChannelExist');
        /* eslint-enable */
        return errors;
      }
      return errors;
    },
    onSubmit: async (values) => {
      /* eslint-disable functional/no-expression-statements, functional/no-conditional-statements */
      socket.emit('renameChannel', { id, name: values.name }, async (response) => {
        const { status } = await response;
        if (status === 'ok') {
          onHide();
          displaySuccess();
        }
        formik.values.body = status === 'ok' ? '' : formik.values.body;
      });
      /* eslint-enable */
    },
  });

  const inputRef = useRef();
  /* eslint-disable functional/no-expression-statements */
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  /* eslint-enable */

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('titles.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              className="mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              id="name"
              name="name"
            />
            <Form.Label className="visually-hidden" for="name">{t('labels.channelName')}</Form.Label>
            {formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={() => onHide()}>{t('buttons.escape')}</Button>
            <Button type="submit" variant="primary">{t('buttons.send')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
