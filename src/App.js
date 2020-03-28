import React from 'react';
import logo from './logo.svg';
import './App.css';
import echarts from 'echarts';
import 'echarts-gl';
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
    let result = {
      headers: [],
      items: []
    };
    let rows = input.split('\n');
    if (rows.length < 1) return result;
    rows.pop();
    let headers = rows.shift().split(',');
    let items = rows.map(function (row) {
      let item = {};
      let fields = row.split(',');
      for (let i = 0; i < headers.length; i++) {
        item[headers[i]] = fields[i];
      }
      return item;
    });
    result.headers = headers;
    result.items = items;
    return result;
  }
  addGeoToDataset(dataset) {
    let regex = /Point\(([0-9]+[.]?[0-9]*) ([0-9]+[.]?[0-9]*)\)/
    dataset.headers = dataset.headers.concat(['lat', 'lng']);
    dataset.items.forEach(item => {
      let captures = regex.exec(item['locationCoordinates']);
      if (captures) {
        item['lat'] = captures[2];
        item['lng'] = captures[1];
      }
    });
  }
  async componentDidMount() {
    this.echartsInstance = echarts.init(document.getElementById('echarts_container'));

    let dataset = await this.loadData();
    this.addGeoToDataset(dataset);
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
      series: [
        {
          name: 'battles',
          type: 'scatterGL',
          progressive: 1e6,
          coordinateSystem: 'geo',
          symbolSize: 1,
          zoomScale: 0.002,
          blendMode: 'lighter',
          large: true,
          itemStyle: {
            color: 'rgb(20, 15, 2)'
          },
          postEffect: {
            enable: true
          },
          silent: true,
          dimensions: ['lng', 'lat']
        }
      ]
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
