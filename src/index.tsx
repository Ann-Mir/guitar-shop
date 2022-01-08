import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { createApi } from './services/api';
import { rootReducer } from './store/root-reducer';
import thunk from 'redux-thunk';

import 'react-toastify/dist/ReactToastify.css';


const api = createApi();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));


ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
