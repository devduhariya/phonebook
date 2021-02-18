
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import Contact from './contacts';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <BrowserRouter basename={process.env.BASENAME}>
				<div className="container">
          <Route exact path='/' component={Contact}/>
				</div>
			</BrowserRouter>
  );
}

export default App;
