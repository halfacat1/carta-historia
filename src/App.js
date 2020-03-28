import React from 'react';
import logo from './logo.svg';
import './App.css';
import echarts from 'echarts';
import 'echarts-maps/world';

class App extends React.Component {
  echartsInstance = null;
  constructor(props) {
    super(props)
    this.state = {};
  }
  async loadData() {
    let response = await fetch(`${window.location.origin}/db.csv`);
    return this.createDatasetFromCsv(await response.text());
  }
  createDatasetFromCsv(input) {
    let rows = input.split('\n').map(function (item) {
      return item.split(',');
    });
    let result = {
      headers: [],
      items: []
    };
    if (rows.length < 1) return result;
    rows.pop();
    result.headers = rows.shift();
    result.items = rows;
    return result;
  }
  async componentDidMount() {
    this.echartsInstance = echarts.init(document.getElementById('echarts_container'));

    let dataset = await this.loadData();
    console.log(dataset);
    var option = {
      backgroundColor: '#000',
      title: {
        text: 'title 000',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      geo: {
        map: 'world',
        roam: true,
        label: {
          emphasis: {
            show: false
          }
        },
        silent: true,
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#111'
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },
      dataset: {
        dimensions: dataset.headers,
        source: dataset.items
      },
      // series: [
      //   {
      //     name: 'wat',
      //     type: 'scatterGL',
      //     progressive: 1e6,
      //     coordinateSystem: 'geo',
      //     symbolSize: 1,
      //     zoomScale: 0.002,
      //     blendMode: 'lighter',
      //     large: true,
      //     itemStyle: {
      //         color: 'rgb(20, 15, 2)'
      //     },
      //     postEffect: {
      //         enable: true
      //     },
      //     silent: true,
      //     dimensions: ['lng', 'lat'],
      //     data: new Float32Array()
      //   }
      // ]
    };

    this.echartsInstance.setOption(option, true);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
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
            Learn React: {this.state.echarts}
          </a>
        </header>
        <div id="echarts_container" className="Chart"></div>
      </div>
    );
  }
}

export default App;
