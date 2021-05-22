import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/css/style.css';
import AppRoute from './routes/AppRoute';

const App = () => {
  return (
    <Router>
      <AppRoute/>
    </Router>
  );
};

export default App;