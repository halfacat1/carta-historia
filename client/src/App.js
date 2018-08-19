import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as echarts from 'echarts';

class App extends Component {

  myChart = undefined;

  componentDidMount() {
    console.log('wa');
    this.myChart = echarts.init(document.getElementById('chartingArea'));
    this.myChart.setOption({
      title: {
          text: 'ECharts entry example'
      },
      tooltip: {},
      xAxis: {
          data: ['shirt', 'cardign', 'chiffon shirt', 'pants', 'heels', 'socks']
      },
      yAxis: {},
      series: [{
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
    });
    console.log('w5a');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>        
        <div id="chartingArea" style={{height: 400}}></div>
      </div>
    );
  }
}

export default App;
