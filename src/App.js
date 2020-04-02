import React from 'react';
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
  cleanYearInDataset(dataset) {
    let results = dataset.items.reduce(function (accumulator, current) {
      let year = parseInt(current.year);
      if (!isNaN(year)) {
        current.year = year;
        accumulator.push(current);
      }
      return accumulator;
    }, []);
    dataset.items = results;
  }
  addGeoToDataset(dataset) {
    let regex = /Point\((-?[0-9]+[.]?[0-9]*) (-?[0-9]+[.]?[0-9]*)\)/;
    dataset.headers = dataset.headers.concat(['lat', 'lng']);
    dataset.items.forEach(item => {
      let captures = regex.exec(item['locationCoordinates']);
      if (captures) {
        item['lat'] = captures[2];
        item['lng'] = captures[1];
      }
    });
  }
  groupCountByYear(items) {
    let results = items.reduce(function (accumulator, current) {
      let currentPropValue = current['year'];
      if (!(currentPropValue in accumulator)) {
        accumulator[currentPropValue] = 0;
      }
      accumulator[currentPropValue]++;
      return accumulator;
    }, {});
    let tuples = Object.entries(results).map(function (pair) {
      pair[0] = parseInt(pair);
      return pair;
    });
    tuples.sort((a, b) => a[0] > b[0] ? 1 : -1);
    return tuples;
  }

  async componentDidMount() {
    this.echartsInstance = echarts.init(document.getElementById('echarts_container'));

    let dataset = await this.loadData();
    this.cleanYearInDataset(dataset);
    this.addGeoToDataset(dataset);

    // Test code
    // let southDeerfield = null;
    // dataset.items.forEach(item => {
    //   if (item['battle'] === 'http://www.wikidata.org/entity/Q885253') {
    //     southDeerfield = item;
    //   }
    // });
    // console.log(dataset);

    var option = {
      backgroundColor: '#000',
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
        },
        bottom: '30%',
        zlevel: 100,
        zoom: 3
      },
      grid: [
        {
          id: 'battles-time-line',
          top: '70%',
          show: true,
          backgroundColor: '#2F394D',
          zlevel: 200
        }
      ],
      dataset: {
        dimensions: dataset.headers,
        source: dataset.items
      },
      xAxis: {
        id: 'battles-time-line-x',
        gridId: 'battles-time-line',
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        },
        zlevel: 201
      },
      yAxis: {
        id: 'battles-time-line-y',
        gridId: 'battles-time-line',
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        },
        zlevel: 201,
      },
      series: [
        {
          name: 'battles-geo-scatter',
          type: 'scatterGL',
          progressive: 1e6,
          coordinateSystem: 'geo',
          symbolSize: 2,
          zoomScale: 0.002,
          blendMode: 'lighter',
          postEffect: {
            enable: true
          },
          zlevel: 101
        },
        {
          name: 'battles-time-line',
          type: 'line',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: this.groupCountByYear(dataset.items),
          lineStyle: {
            color: '#000'
          },
          itemStyle: {
            color: '#fff',
            borderColor: '#fff'
          },
          zlevel: 201,
        }
      ],
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          start: 40,
          end: 55,
          zlevel: 201
        },
      ],
      visualMap: [
        {
          seriesIndex: 0,
          dimension: 'year',
          type: 'piecewise',
          splitNumber: 10,
          min: -3000,
          max: 2000,
          inRange: {
            color: ['#94b9af', '#90a583', '#9d8420', '#942911', '#593837']
          },
          outOfRange: {
            color: ['#000000']
          },
          textStyle: {
            color: '#fff'
          },
          bottom: '30%',
          zlevel: 110
        }
      ]
    };

    this.echartsInstance.setOption(option, true);

    let self = this;
    window.onresize = function () {
      self.echartsInstance.resize();
    };
  }
  render() {
    return (
      <div className="App">
        <div id="echarts_container" className="Chart"></div>
      </div>
    );
  }
}

export default App;
