import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { ModalDataContextProvider } from './components/Modal/Modal.context';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <ModalDataContextProvider>
      <App />
    </ModalDataContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
