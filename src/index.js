import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TestOne from './TestOne';
import reportWebVitals from './reportWebVitals';
import TestTwo from './TestTwo';
import TestThree from './TestThree';
import TestFour from './TestFour';
import TestFive from './TestFive';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/* <TestOne /> */}
    {/* <TestTwo /> */}
    {/* <TestThree /> */}
    {/* <TestThree /> */}
    <TestFive />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
