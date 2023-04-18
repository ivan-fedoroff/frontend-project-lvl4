/* eslint-disable functional/no-expression-statements,
functional/no-conditional-statements, consistent-return */

import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useRollbar } from '@rollbar/react';

import socket from '../utils/socket';
import useNetErrToast from './hooks/useNetErrToast';

const MessageForm = ({ curChannelId }) => {
  const rollbar = useRollbar();
  const [btnBlocked, setBlocked] = useState(false);
  const username = localStorage.getItem('username');
  const { t } = useTranslation();
  const displayNetErr = useNetErrToast();
  const user = localStorage.getItem('username');

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      const body = filter.clean(values.body);
      const message = { body, channelId: curChannelId, username };
      console.log(message);
      setBlocked(true);

      await socket.emit('newMessage', message, async (response) => {
        const { status } = await response;
        formik.values.body = status === 'ok' ? '' : formik.values.body;
        if (status !== 'ok') {
          const error = new Error('error sending message');
          rollbar.error('Error sending message', error, { user });
          displayNetErr();
        }
      });
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
        <InputGroup>
          <Form.Control
            className="border-0 p-0 ps-2"
            name="body"
            aria-label="Новое сообщение"
            placeholder={t('forms.message')}
            ref={inputRef}
            onChange={formik.handleChange}
            value={formik.values.body}
          />
          <Form.Control.Feedback tooltip type="invalid">{formik.errors.body}</Form.Control.Feedback>
          <button className="btn btn-group-vertical" type="submit" disabled={formik.values.body === '' || btnBlocked}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
            <span className="visually-hidden">{t('buttons.send')}</span>
          </button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
