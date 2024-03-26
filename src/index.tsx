import React from 'react';
import ReactDOM from 'react-dom/client';
import './shared/fonts/gilroy/stylesheet.css';
import './app/styles/global.styles.css';
import AppRouter from './app/app-router';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from 'shared/error-boundary/ErrorBoundary';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <AppRouter/>
        </ErrorBoundary>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
