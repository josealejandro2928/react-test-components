import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { ModalDataContextProvider } from 'react-hook-modal';
import './index.scss';
import 'react-hook-modal/dist/index.css';
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalDataContextProvider>
        <App />
      </ModalDataContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
