import React from 'react';
import BattleVisualizer from './BattleVisualizer/BattleVisualizer';
import HelpOverlay from './HelpOverlay/HelpOverlay';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HelpOverlay />
        <BattleVisualizer />
      </div>
    );
  }
}

export default App;
