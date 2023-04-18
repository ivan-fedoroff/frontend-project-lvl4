/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as  RollbarProvider, ErrorBoundary } from '@rollbar/react';

import store from './slices/index';
import ru from './locales/ru';

const rollbarConfig = {
  accessToken: '92a0fb115b884a65b1db6c334e9c7084',
  environment: 'testenv',
};

i18n
  .use(initReactI18next)
  .init({
    resources: { ru },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <React.StrictMode>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </React.StrictMode>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
