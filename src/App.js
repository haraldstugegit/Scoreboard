import React from 'react';
import './App.css';
import Scoreboard from './Scoreboard';

function App() {
  const competitionName = "The Autonomous Ship Challenge";
  const competitionDescription = "A competition where innovative minds control ships through treacherous waters, all autonomously.";

  return (
    <div className="App">
      <div className="content">
        <div className="info-box">
          <h1>Today's Competition:</h1>
          <h2>{competitionName}</h2>
          <p>{competitionDescription}</p>
          <img href="/images/segl_svart.png"/>
        </div>
        <div className="scoreboard-box">
          <Scoreboard />
        </div>
      </div>
    </div>
  );
}

export default App;
