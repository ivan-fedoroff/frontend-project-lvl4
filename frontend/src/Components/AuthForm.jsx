/* eslint-disable jsx-a11y/label-has-associated-control */

import { useFormik } from 'formik';

/* const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    const newErr1 = { ...errors, nickname: true };
    return newErr1;
  }

  if (!values.password) {
    const newErr2 = { ...errors, password: true };
    return newErr2;
  }

  return errors;
}; */

const AuthForm = () => {
  const formik = useFormik({
    initialValues: {
      nickname: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2)); // eslint-disable-line
    },
  });
  return (
    <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>

      <div className="form-floating mb-3">
        <label htmlFor="nickname">Ваш Ник</label>
        <input
          id="nickname"
          className="form-control"
          name="nickname"
          type="text"
          placeholder="Ваш Ник"
          onChange={formik.handleChange}
          value={formik.values.nickname}
        />
      </div>

      <div className="form-floating mb-4">
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          className="form-control"
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </div>

      <button className="w-100 mb-3 btn btn-outline-primary" type="submit">Войти</button>
    </form>
  );
};

export default AuthForm;
