import React, { useState } from 'react';
import LoginForm from '../components/ui/loginForm';
import { useParams } from 'react-router-dom';
import RegisterForm from '../components/ui/registerForm';

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === 'register' ? type : 'login');

  const toggleFormType = (param) => {
    setFormType((prevState) => (prevState === 'register' ? 'login' : 'register'));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType == 'login' ? (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm></LoginForm>
              <p>
                Already have account?{' '}
                <a role="button" onClick={toggleFormType}>
                  Sign In
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Registration</h3>
              <RegisterForm></RegisterForm>
              <p>
                Dont have account?{' '}
                <a role="button" onClick={toggleFormType}>
                  Sign Up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
