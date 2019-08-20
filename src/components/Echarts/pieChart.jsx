/**
 * echarts-饼状图
 * Seong Han
 * 2019.08.16
 */
import React , {Component} from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from "echarts";

export default class pieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      legendData: [],
      listData: [],
      option: {},
    }
  }
  componentDidMount() {
    this.setOption()
  }

  setOption = () => {
    this.getData()
    const { title } = this.props
    const { legendData,listData } = this.state
    const option = {
      title: { 
        text: title,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "horizontal",
        top:"10%",
        data: legendData
      },
      grid: {
        top: "20%",    //距离容器上边界40像素
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "60%",
          center: ["50%", "50%"],
          itemStyle: {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
          },
          hoverAnimation: false, 
          data: listData,
        }
      ]
    }
    this.setState({
      option
    })

  }
  getData = () => {
    const { pieChart } = this.props
    const { legendData,listData } = this.state
    const arrayData= []
    for (var key in pieChart){
      legendData.push(key)
      arrayData.push(pieChart[key])
    }
    var color= ['#08c','#fa5','#c03', '#609','#703','#0fc']
    //datalist遍历
    for(var i=0; i<legendData.length; i++){
      listData.push({
        value: arrayData[i], name: legendData[i],
        itemStyle: {
              normal: {
                  color: { // 完成的圆环的颜色
                      colorStops: [{offset: 0,color: '#fff' // 0% 处的颜色
                      }, {offset: 1,color: color[i] // 100% 处的颜色
                      }]
                  },
                  label: {
                      show: false
                  },
                  labelLine: {
                      show: false
                  }
              } 
          }
      })
    }
    this.setState({
      legendData,
      listData
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