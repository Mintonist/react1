import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import App from './app';
import createStore from './store/createStore';
import { Provider } from 'react-redux';

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
