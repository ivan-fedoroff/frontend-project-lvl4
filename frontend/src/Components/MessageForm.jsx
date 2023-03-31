/* eslint-disable functional/no-expression-statements, consistent-return */

import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const MessageForm = (props) => {
  const [btnBlocked, setBlocked] = useState(false);
  const channelsData = useSelector((state) => state.chatDataLoader.channelsData);
  const { currentChannelId } = channelsData;
  const username = localStorage.getItem('username');
  const { handleMessageSubmit } = props;

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      setBlocked(true);
      await handleMessageSubmit(values, currentChannelId, username, formik);
      setBlocked(false);
    },
  });
  return (
    <div className="mt-auto px-5 py-3">
      <Form
        className="py-1 border rounded-2"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Form.Group>
          <Form.Control
            className="border-0 p-0 ps-2"
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            onChange={formik.handleChange}
            value={formik.values.body}
          />
          <button className="p-o text-primary btn btn-group-vertical" type="submit" disabled={formik.values.body === '' || btnBlocked}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;