import React from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
import 'echarts-maps/world';
import './BattleVisualizer.css';
import ApiProxy from '../api/apiProxy'

class BattleVisualizer extends React.Component {
  SCATTER_GL_SIZE = 3;
  TIMELINE_BACKGROUND_COLOR = 'rgba(47, 57, 77, 0.5)';
  TIMELINE_LINE_COLOR = 'rgba(146, 176, 155, 0.5)';
  TEXT_COLOR = '#fff';

  echartsInstance = null;
  apiProxy = null;

  constructor(props) {
    super(props);
    this.apiProxy = new ApiProxy();
  }

  _getBattleCountByYear(items) {
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
  _getScatterSeriesData(dataset) {
    return dataset.items.map(function (item) {
      return {
        name: item.battleLabel,
        value: [item.lng, item.lat, item]
      };
    });
  }
  _formatYear(value) {
    let result = Math.round(value);
    return Math.abs(result) + (result > 0 ? " CE" : " BCE");
  }

  async componentDidMount() {
    let self = this;
    this.echartsInstance = echarts.init(document.getElementById('echarts_container'));

    let dataset = await this.apiProxy.loadDataset();

    window.onresize = function () {
      self.echartsInstance.resize();
    };

    this.echartsInstance.on('dataZoom', function () {
      let dataZoom = self.echartsInstance.getOption().dataZoom[0];
      self.echartsInstance.setOption({
        visualMap: {
          id: 'battles-geo-scattergl',
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
        zoom: 2,
        bottom: '10%',
        zlevel: 100
      },
      grid: [
        {
          id: 'battles-time-line',
          top: '90%',
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
        name: 'Year',
        nameTextStyle: {
          color: self.TEXT_COLOR
        },
        axisLabel: {
          textStyle: {
            color: self.TEXT_COLOR
          },
          formatter: self._formatYear
        },
        animation: false,
        zlevel: 201
      },
      yAxis: {
        id: 'battles-time-line-y',
        gridId: 'battles-time-line',
        type: 'value',
        name: '# of Battles per Year',
        nameTextStyle: {
          color: self.TEXT_COLOR
        },
        axisLabel: {
          textStyle: {
            color: self.TEXT_COLOR
          },
          showMinLabel: false
        },
        splitNumber: 1,
        splitLine: {
          show: false
        },
        silent: true,
        animation: false,
        zlevel: 201,
      },
      series: [
        {
          id: 'battles-geo-scattergl',
          type: 'scatterGL',
          progressive: 1e6,
          coordinateSystem: 'geo',
          symbolSize: self.SCATTER_GL_SIZE,
          blendMode: 'lighter',

          zlevel: 101
        },
        {
          id: 'battles-geo-scatter',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: self._getScatterSeriesData(dataset),
          symbolSize: 15,
          itemStyle: {
            opacity: 0
          },
          large: true,
          animation: false,
          tooltip: {
            formatter: function (params) {
              let item = params.value[2];
              return item.battleLabel + '<br/>' + self._formatYear(item.year);
            }
          },
          zlevel: 110
        },
        {
          id: 'battles-time-line',
          type: 'line',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: this._getBattleCountByYear(dataset.items),
          lineStyle: {
            color: self.TIMELINE_LINE_COLOR
          },
          itemStyle: {
            color: self.TEXT_COLOR,
            borderColor: self.TEXT_COLOR
          },
          symbolSize: 1,
          tooltip: {
            show: false
          },
          animation: false,
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
      tooltip: {
        trigger: 'item',
      },
      visualMap: [
        {
          id: 'battles-geo-scattergl',
          seriesIndex: 0,
          dimension: 'year',
          type: 'piecewise',
          splitNumber: 10,
          min: -3000,
          max: 3000,
          inRange: {
            color: ['#94b9af', '#90a583', '#9d8420', '#593837', '#942911']
          },
          outOfRange: {
            color: ['rgba(0, 0, 0, 0.5)']
          },
          textStyle: {
            color: self.TEXT_COLOR
          },
          bottom: '15%',
          formatter: function (value1, value2) {
            return self._formatYear(value1) + ' to ' + self._formatYear(value2);
          },
          zlevel: 110
        }
      ]
    };

    this.echartsInstance.setOption(option, true);
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
