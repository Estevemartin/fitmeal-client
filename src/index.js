import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ScrollIntoView from "./components/ScrollIntoView"

ReactDOM.render(
  <Router>
    <ScrollIntoView/>
    <App />
  </Router>
, document.getElementById('root'));
