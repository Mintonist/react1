import React, { useState } from 'react';
import LoginForm from '../components/ui/loginForm';
import { useParams } from 'react-router-dom';
import RegisterForm from '../components/ui/registerForm';

const Login = () => {
  const { param } = useParams();
  const [formType, setFormType] = useState(param === 'register' ? param : 'login');

  const toggleFormType = () => {
    setFormType((prevState) => (prevState === 'register' ? 'login' : 'register'));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType == 'login' ? (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm />
              <p>
                Dont have account?{' '}
                <span role="button" onClick={toggleFormType}>
                  Sign Up
                </span>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Registration</h3>
              <RegisterForm />
              <p>
                Already have account?{' '}
                <span role="button" onClick={toggleFormType}>
                  Sign In
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
