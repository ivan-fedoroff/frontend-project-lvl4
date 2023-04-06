/* eslint-disable functional/no-expression-statements,
functional/no-conditional-statements, consistent-return */

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import routes from '../utils/routes';
import useAuth from './useAuth';

const regSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .min(3, 'От трех до 20 символов')
    .max(20, 'От трех до 20 символов'),
  password: Yup.string()
    .required()
    .min(6, 'Не менее 6 символов'),
  confirmPassword: Yup.mixed()
    .required()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});

const RegForm = () => {
  const [networkError, setNetworkError] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: regSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const path = routes.createPath();
        const body = { username, password };
        const response = await axios.post(path, body, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { token } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        navigate('/');
        auth.logIn();
      } catch (e) {
        console.log(e);
        if (e.response.status === 409) {
          formik.errors.username = 'Такой пользователь уже существует';
          formik.touched.username = true;
        } else {
          setNetworkError(e.message);
        }
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Регистрация</h1>
      <FloatingLabel
        controlId="username"
        label="Ваш Ник"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Ваш Ник"
          required
          isInvalid={formik.touched.username && formik.errors.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        controlId="password"
        label="Пароль"
        className="mb-4"
      >
        <Form.Control
          type="password"
          placeholder="Пароль"
          required
          isInvalid={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        controlId="confirmPassword"
        label="Подтвердите пароль"
        className="mb-4"
      >
        <Form.Control
          type="password"
          placeholder="Подтвердите пароль"
          required
          isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        <Form.Control.Feedback tooltip type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
      </FloatingLabel>
      {networkError ? <div>{networkError}</div> : null}
      <Button variant="outline-primary" className="w-100 mb-3" type="submit">Войти</Button>
    </Form>
  );
};

export default RegForm;
