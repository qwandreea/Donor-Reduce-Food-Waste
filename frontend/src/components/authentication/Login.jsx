import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useTranslation } from 'react-i18next'

import AuthService from "services/auth/auth.service";
import Header from "components/shared/Header";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required
      </div>
    );
  }
};


function Login() {
  const { t } = useTranslation();
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setUsername(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <Header></Header>
      <div className="container  w-50 p-3 border position-relative" style={{ marginTop: `10em` }}>
        <div class="text-center pt-5">
          <h3>Login to <strong>Donor</strong>.</h3>
        </div>
        <Form onSubmit={handleLogin} ref={form} className="px-4 py-3">
          <div className="mb-3">
            <label htmlFor="emailLogin1" className="form-label">Email address</label>
            <Input
              type="text"
              className="form-control"
              id="emailLogin1"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordLogin1" className="form-label">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              id="passwordLogin1"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <div className="mb-3">
            <div className="form-check">
              <Input type="checkbox" className="form-check-input" id="dropdownCheck" />
              <label className="form-check-label" htmlFor="dropdownCheck">
                Remember me
              </label>
            </div>
          </div>



          <div className="mb-3">
            <div className="form-group">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </div>
        </Form>
        <div className="ps-3">
          <p>Don't have an account? <a href="/signup" className="link-danger">Register</a></p>
          {/* <a className="link" href="#">Forgot password?</a> */}
        </div>
      </div>
    </div>
  )
}

export default Login