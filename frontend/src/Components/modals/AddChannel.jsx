/* eslint-disable functional/no-expression-statements,
functional/no-conditional-statements, no-param-reassign */

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';

import socket from '../../utils/socket';
import { selectors } from '../../slices/channelsSlice';

const Add = (props) => {
  const { onHide, setItem } = props;
  const channels = useSelector(selectors.selectAll);
  const formik = useFormik({
    initialValues: { name: '' },
    validate: (values) => {
      const errors = {};
      if (channels.findIndex((channel) => channel.name === values.name) >= 0) {
        errors.name = 'Канал с таким именем уже существует';
      }
      return errors;
    },
    onSubmit: async (values) => {
      socket.emit('newChannel', values, async (response) => {
        const { status, data } = await response;
        formik.values.body = status === 'ok' ? '' : formik.values.body;
        setItem(data.id);
        onHide();
      });
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
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
              name="name"
            />
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            {formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2">Отменить</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
