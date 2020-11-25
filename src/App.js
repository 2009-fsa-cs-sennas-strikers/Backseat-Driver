import React from 'react'
import logo from './logo.svg';
import Scene from './pixi/Scene';
import './App.css';
import firebase from './firebase'

function App() {
  return (
    <div className="App">
      <Scene />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
