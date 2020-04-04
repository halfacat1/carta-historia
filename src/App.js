import React from 'react';
import './App.css';
import BattleVisualizer from './BattleVisualizer/BattleVisualizer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BattleVisualizer></BattleVisualizer>
      </div>
    );
  }
}

export default App;
