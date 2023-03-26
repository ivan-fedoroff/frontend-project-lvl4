/* eslint-disable functional/no-expression-statements, consistent-return */

import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import routes from '../routes';

const AuthForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

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
        localStorage.setItem('userId', JSON.stringify(response.data));
        navigate('/');
        auth.logIn();
      } catch (e) {
        formik.setSubmitting(false);
        if (e.isAxiosError && e.response.status === 401) {
          setAuthFailed(true);
          setErrorText('the username or password is incorrect');
          return errorText;
        }
        setErrorText(e.message);
      }
    },
  });
  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <fieldset disabled={formik.isSubmitting}>
        <FloatingLabel
          controlId="username"
          label="Ваш Ник"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Ваш Ник"
            isInvalid={authFailed}
            required
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="password"
          label="Пароль"
          className="mb-4"
        >
          <Form.Control
            type="password"
            placeholder="Пароль"
            isInvalid={authFailed}
            required
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Form.Control.Feedback type="invalid">{errorText}</Form.Control.Feedback>
        </FloatingLabel>
        <Button variant="outline-primary" className="w-100 mb-3" type="submit">Войти</Button>
      </fieldset>
    </Form>
  );
};

export default AuthForm;
