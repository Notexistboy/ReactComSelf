/**
 * echarts-圆环图
 * Seong Han
 * 2019.08.16
 */
import React , {Component} from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from "echarts";

export default class fanChart extends Component {
  constructor(props) {
    //调用super()时，this被初始化
    super(props);
    /* this.props = {
    }; */
    this.state = {
      legendData: [],
      listData: [],
      seriesData: [],
      option: {},
    }
    this.getData = this.getData.bind(this)
    this.setOption = this.setOption.bind(this)
  }
  componentDidMount() {
    this.setOption()
  }
  setOption = () => {
    this.getData()
    debugger
    const { title } =this.props;
    const { legendData, listData } = this.state;
    debugger
    const option = {
      title: {
        text: title,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
				orient: "horizontal",
				top:"10%",
        data: legendData
			},
      grid : {
        top : "20%",    //距离容器上边界40像素
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "60%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
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
    debugger
    this.setState({
      option
    })
    /* return (
      <div>
        <ReactEcharts
            option={option}
            lazyUpdate={true}
            notMerge={true}
            id="rightLine"
            style={{ width: 'calc(80vw)', height: 'calc(60vh)' , marginTop: '5vh'}}
        />
      </div>
    ) */
  }
  getData = () => {
    const { annularData } =this.props;
    const { legendData, listData } = this.state;
    const arrayData = [];
    debugger
    for (var key in annularData){
      legendData.push(key)
      arrayData.push(annularData[key])
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
      listData,
    })
  }

  render() {
    const { option } = this.state
    return (
      <div>
         {/*this.setOption() */}
         <ReactEcharts
            option={option}
            lazyUpdate={true}
            notMerge={true}
            id="rightLine"
            style={{ width: 'calc(80vw)', height: 'calc(60vh)' , marginTop: '5vh'}}
        />
      </div>
    )
  }
}