import React from 'react';
import './BattleVisualizer.css';
import echarts from 'echarts';
import 'echarts-gl';
import 'echarts-maps/world';

class BattleVisualizer extends React.Component {
  SCATTER_GL_SIZE = 3;
  TIMELINE_BACKGROUND_COLOR = 'rgba(47, 57, 77, 0.5)';
  TIMELINE_LINE_COLOR = 'rgba(146, 176, 155, 0.5)';
  TEXT_COLOR = '#fff';

  echartsInstance = null;

  constructor(props) {
    super(props)
    this.state = {};
  }
  async loadData() {
    let response = await fetch(`${window.location.href}/db.csv`);
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
    let self = this;
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

    this.echartsInstance.on('dataZoom', function (event) {
      let dataZoom = self.echartsInstance.getOption().dataZoom[0];
      self.echartsInstance.setOption({
        visualMap: {
          id: 'battles-geo-scatter',
          min: Math.round(dataZoom.startValue, 0),
          max: Math.round(dataZoom.endValue, 0),
          textStyle: {
            color: self.TEXT_COLOR
          },
        }
      });
    });

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
        zoom: 4
      },
      grid: [
        {
          id: 'battles-time-line',
          top: '70%',
          show: true,
          backgroundColor: self.TIMELINE_BACKGROUND_COLOR,
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
            color: self.TEXT_COLOR
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
            color: self.TEXT_COLOR
          }
        },
        zlevel: 201,
      },
      series: [
        {
          id: 'battles-geo-scatter',
          type: 'scatterGL',
          progressive: 1e6,
          coordinateSystem: 'geo',
          symbolSize: self.SCATTER_GL_SIZE,
          blendMode: 'lighter',
          
          zlevel: 101
        },
        {
          id: 'battles-time-line',
          type: 'line',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: this.groupCountByYear(dataset.items),
          lineStyle: {
            color: self.TIMELINE_LINE_COLOR
          },
          itemStyle: {
            color: self.TEXT_COLOR,
            borderColor: self.TEXT_COLOR
          },
          zlevel: 201,
        }
      ],
      dataZoom: [
        {
          id: 'battles-time-line',
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
          id: 'battles-geo-scatter',
          seriesIndex: 0,
          dimension: 'year',
          type: 'piecewise',
          splitNumber: 10,
          min: -3000,
          max: 3000,
          inRange: {
            color: ['#94b9af', '#90a583', '#9d8420', '#942911', '#593837']
          },
          outOfRange: {
            color: ['#000000']
          },
          textStyle: {
            color: self.TEXT_COLOR
          },  
          bottom: '35%',
          zlevel: 110
        }
      ]
    };

    this.echartsInstance.setOption(option, true);

    window.onresize = function () {
      self.echartsInstance.resize();
    };
  }
  render() {
    return (
      <div className="BattleVisualizer">
        <div id="echarts_container" className="ChartArea"></div>
      </div>
    );
  }
}

export default BattleVisualizer;
