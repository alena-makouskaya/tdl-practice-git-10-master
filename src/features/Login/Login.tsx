// @flow
import { useFormik } from "formik";
import * as React from "react";
type Props = {};

export type ErrorsType = {
  email?: string;
  password?: string;
};

export const Login = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validate: (values) => {
      const errors: ErrorsType = {};

      const pattern = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

      if (!values.email) {
        errors.email = "Required";
      } else if (!pattern.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
  });

  console.log(formik.values);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="loginForm">
        <div className="formInput">
          <label>Email</label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}

          />
          {formik.touched.email && formik.errors.email && (
            <div className="errorText">{formik.errors.email}</div>
          )}
        </div>

        <div className="formInput">
          <label>Password</label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="errorText">{formik.errors.password}</div>
          )}
        </div>

        <div className="formCheckbox">
          <input
            id="rememberMe"
            type="checkbox"
            checked={formik.values.rememberMe}
            {...formik.getFieldProps('rememberMe')}
          />
          <label>Remember me</label>
        </div>

        <button type="submit" className="formButton">
          Login
        </button>
      </form>
    </div>
  );
};
