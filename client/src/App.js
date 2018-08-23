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
          encode: {
            x: 'year',
            y: 'locationLabel'
          }
        }
      ],
      tooltip: {
        formatter: function (params) {
          return `${params.data.year} - ${params.data.battleLabel} - ${params.data.locationLabel}`;
        }
      }
    });
  }

  render() {
    return (
      <div id="chartingArea" style={{height: 700}}></div>
    );
  }
}

export default App;
