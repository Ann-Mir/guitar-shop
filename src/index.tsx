import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { createApi } from './services/api';
import { rootReducer } from './store/root-reducer';
import thunk from 'redux-thunk';


const api = createApi();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
