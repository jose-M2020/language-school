import React from 'react';
import App from './App';
import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
            <ProSidebarProvider>
              <App />
            </ProSidebarProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
