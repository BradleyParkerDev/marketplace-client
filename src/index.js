import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from "./Hooks/Auth";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		<AuthProvider>
    	<App />
		</AuthProvider>
  </React.StrictMode>
);


reportWebVitals();
