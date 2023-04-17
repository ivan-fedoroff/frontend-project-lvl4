/* eslint-disable functional/no-expression-statements, consistent-return */

import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from './hooks/useAuth';
import routes from '../utils/routes';
import useNetErrToast from './hooks/useNetErrToast';

const AuthForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const displayNetErr = useNetErrToast();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { token, username } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        navigate('/');
        auth.logIn();
      } catch (e) {
        formik.setSubmitting(false);
        if (e.isAxiosError && e.response.status === 401) {
          setAuthFailed(true);
          setErrorText(t('feedback.errorAuth'));
          return errorText;
        }
        displayNetErr();
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('main.signin')}</h1>
      <fieldset disabled={formik.isSubmitting}>
        <FloatingLabel
          controlId="username"
          label={t('forms.username')}
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder={t('forms.username')}
            isInvalid={authFailed}
            required
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="password"
          label={t('forms.password')}
          className="mb-4"
        >
          <Form.Control
            type="password"
            placeholder={t('forms.password')}
            isInvalid={authFailed}
            required
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Form.Control.Feedback type="invalid">{errorText}</Form.Control.Feedback>
        </FloatingLabel>
        <Button variant="outline-primary" className="w-100 mb-3" type="submit">{t('buttons.signin')}</Button>
      </fieldset>
    </Form>
  );
};

export default AuthForm;
