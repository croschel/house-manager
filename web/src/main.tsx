import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';
import { Provider } from 'react-redux';
import { store } from './reducers/index.ts';
import { init } from './reducers/app/actions.ts';
import { ToastNotify } from './components/generic/toast-notify.tsx';

store.dispatch(init());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastNotify />
    </Provider>
  </React.StrictMode>
);
