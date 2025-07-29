import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Redux Provider & Store
import { Provider } from 'react-redux';
import { store } from './redux/store';

// React Router
import { BrowserRouter } from 'react-router-dom';

// Global Styles
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

