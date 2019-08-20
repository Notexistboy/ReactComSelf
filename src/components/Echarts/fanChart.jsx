/**
 * echarts-扇形图
 * Seong Han
 * 2019.08.16
 */
import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from "echarts";

export default class fanChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleData: [],
      seriesData: [],
      option: {},
    }
  }
  componentDidMount() {
    this.setOption()
  }

  setOption = () => {
    this.getData()
    const { titleData, seriesData } = this.state
    const option = {
      title: titleData,
      series: seriesData
    }
    this.setState({
      option
    })
  }
  getData = () => {
    const { fanChart } = this.props
    const { titleData, seriesData } = this.state
    const listData = []
    var color = ['#08c', '#fa5', '#c03', '#609', '#703', '#0fc']
    fanChart.forEach(function (item, index) {
      debugger
      titleData.push({
        text: item.name,
        left: index * 30 + 24 + '%',
        top: '65%',
        textAlign: 'center',
        textStyle: {
          fontWeight: 'normal',
          fontSize: '16',
          color: color[index],
          textAlign: 'center',
        },
      });
      seriesData.push({
        name: item.name,
        type: 'pie',
        clockWise: false,
        radius: [60, 70],
        itemStyle: {
          normal: {
            //barBorderRadius: 10, // 柱条边线圆角，单位px，默认为0
            barBorderRadius: 10,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 1, color: color[index] },
              { offset: 0, color: "#fff" }
            ]),
            shadowColor: color[index],
            shadowBlur: 0,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
          }
        },
        hoverAnimation: false,
        center: [index * 30 + '%', '50%'],
        data: [
          {
            value: listData[index],
            itemStyle: {
              normal: {
                barBorderRadius: 5
              }
            },
            label: {
              normal: {
                formatter: function (params) {
                  return params.value;
                },
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold',
                  color: color[index]
                }
              }
            },
          }, {
            value: 100 - listData[index],
            name: 'invisible',
            itemStyle: {
              normal: {
                color: '#eee'
              },
              emphasis: {
                color: '#eee'
              }
            }
          }]
      })
    })
    debugger
    this.setState({
      titleData,
      seriesData
    })
  }

  render() {
    const { option } = this.state
    return (
      <div>
        <ReactEcharts
          option={option}
          lazyUpdate={true}
          notMerge={true}
          id="rightLine"
          style={{ width: 'calc(80vw)', height: 'calc(60vh)' , marginTop: '5vh'}}/>
      </div>
    )
  }
}