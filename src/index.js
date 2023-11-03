import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import AppRoute from './AppRoute';

// DEVELOPERS NOTE:
// This loads up our simulated API backend server. When you use capsule-ui with
// an actual API backend server then delete this code.
import createMockServer from "./mock";

// DEVELOPERS NOTE:
// This loads up our simulated API backend server if the environment variable
// is set to development. Delete this when you are uing actual API backend.
if (process.env.REACT_APP_MOCK_API_BACKEND === "Yes") {
    createMockServer({ environment: "development" })
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppRoute />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
