import React, { Component } from 'react';
import './App.css';
import * as echarts from 'echarts';
import * as axios from 'axios';

class App extends Component {

  myChart = undefined;

  async componentDidMount() {
    let battles = (await axios.get('http://localhost:3100/data')).data;

    this.myChart = echarts.init(document.getElementById('chartingArea'));
    this.myChart.setOption({
      title: {
          text: 'ECharts entry example'
      },
      tooltip: {},
      dataset: {
        source: battles
      },
      xAxis: {
        data: battles.map(b => b.year)
      },
      yAxis: {
        type: 'category',
        data: battles.map(b => b.locationLabel)
      },
      series: [
        {
          type: 'scatter',
          dimensions: ['battleLabel', 'year', 'locationLabel'],
          encode: {
            x: 'year',
            y: 'locationLabel'
          }
        }
      ]
    });
  }

  render() {
    return (
      <div id="chartingArea" style={{height: 700}}></div>
    );
  }
}

export default App;
