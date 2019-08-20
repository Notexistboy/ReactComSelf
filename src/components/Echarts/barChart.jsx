/**
 * echarts-柱状图
 * Seong Han
 * 2019.08.16
 */
import React , {Component} from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from "echarts";

export default class barChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legendData:[],
      xAxisDatas: [],
      yAxisData: [],
      seriesData: [],
      seriesDataShadow: [],
      myChartoption: {},
      myShadowoption: {},
    }
    this.getData = this.getData.bind(this)
    this.setOption = this.setOption.bind(this)
  }
  componentDidMount() {
    this.setOption()
  }
  setOption = () => {
    this.getData()
    const { title } = this.props
    const { legendData, xAxisDatas, yAxisData, seriesData, seriesDataShadow, } = this.state
    let xAxisData = [ ...new Set( xAxisDatas ) ]
    const myChartoption = {
      title: {
        text: title 
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
				orient: "horizontal",
        top:"10%",
        data: legendData
			},
      grid : {
        top : "20%",    //距离容器上边界40像素
      },
      lable: true,
      xAxis: [
        {
          type: "category",
          data: xAxisData,
          axisTick: { show: false }
        }
      ],
      yAxis: yAxisData,
      series: seriesData,
    }
    const myShadowoption = {
      title: {
        text: ""
      },
      legend: {
				orient: "horizontal",
        top:"10%",
        data: legendData
			},
      grid : {
        top : "20%",    //距离容器上边界40像素
      },
      xAxis: {
        type: "category",
        data: null,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      series: seriesDataShadow
    }
    
    this.setState({
      myChartoption,
      myShadowoption
    })
  }

  getData = () => {
    const { barChart, descript, legend, } = this.props
    const { legendData, xAxisDatas, yAxisData, seriesData, seriesDataShadow, } = this.state
    const color = ['#08c','#fa5','#c03', '#609','#703','#0fc']
    let values= []
    let obj={}
    let dataShadow = []
    let offset = 0
    let yMaxArr = []
    let yMinArr = []
    let yMax, yMin, itemLength
    for(let key in barChart){
      legendData.push(key);   
      values.push(barChart[key])//取得value
      for(let item in barChart[key]){
        xAxisDatas.push(item)
      }
      
    }
    values.map((item,index) => {
      
      obj["data_"+index]=[]
      for(let it in values[index]){
        obj["data_"+index].push(values[index][it])
      }
      yMaxArr.push(Math.max.apply(null, obj["data_"+index]))
      yMinArr.push(Math.min.apply(null, obj["data_"+index]))
      yMax = Math.max.apply(null, yMaxArr)
      yMin = Math.min.apply(null, yMaxArr)
      itemLength = obj["data_"+index].length
      
      if(!descript){
        if(index===2){
          offset = 25;
          }else if(index>2){
          offset = 25+(index*25);
        }
        yAxisData.push({
          type: 'value',
          name: legendData[index],
          mix: Math.min.apply(null, obj["data_"+index]),
          max: Math.max.apply(null, obj["data_"+index]),
          interval: Math.ceil((Math.max.apply(null, obj["data_"+index]))/ 5),//刻度均匀分
          axisLabel: {
            formatter: '{value}'
          },
          axisLine: {
            lineStyle: {
                color: color[index]
            }
          },
          offset:offset
        })
      }
      
      seriesData.push({
        name: legendData[index],
        type: "bar",
        barWidth: "20%",
        data: obj["data_"+index],
        itemStyle: {
          normal: {
            barBorderRadius: 3, // 柱条边线圆角，单位px，默认为0
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: color[index] },
              { offset: 1, color: "#fff" }
            ])
          },
          emphasis: {
            barBorderRadius: 3,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: color[index] },
              { offset: 1, color: "#fff" }
            ])
          },
        },
      })
    })
    //Y轴遍历 是同类，只有1个y轴
    if(descript){
      yAxisData.push({
        type: 'value',
        name: legend,
        mix: yMin,
        max: yMax,
        axisLabel: {
          formatter: '{value}'
        },
      })
    }else{
      seriesData.forEach((item,index) => {
        
        item['yAxisIndex']  = index
      })
    }
    //阴影部分
    for(let index=0; index<values.length; index++){
      const itemLength = obj["data_"+index].length
      if(dataShadow.length < itemLength){
        //i不能混用 下面还要用i
        for (let j = 0; j < itemLength; j++) {
          dataShadow.push(yMax)
        }
      }
      
      seriesDataShadow.push({
        // For shadow
        type: "bar",
        itemStyle: {
          normal: { color: "rgba(0,0,0,0.05)" }
        },
        name: legendData[index],
        barWidth: "20%",
        barCategoryGap: "-150%",
        data: dataShadow, //会显示出来
        animation: false,
      })
    }
    this.setState({
      legendData,
      xAxisDatas,
      yAxisData,
      seriesData,
      seriesDataShadow,
    })
  }

  render() {
    const { myChartoption, myShadowoption } = this.state
    return (
      <div  style={{width:'500px', height:'500px', position:'relative', display:'block'}}>
        <div style={{width:'500px', height:'500px', position:'absolute', top:0, left:0, zIndex:1}}>
          <ReactEcharts
              option={myChartoption}
              lazyUpdate={true}
              notMerge={true}
              id="rightLine"
              style={{ width: 'calc(80vw)', height: 'calc(60vh)' , marginTop: '5vh' }}
          />
        </div>
        <div style={{width:'500px', height:'500px', position:'absolute', top:0, left:0, }}>
          <ReactEcharts
              option={myShadowoption}
              lazyUpdate={true}
              notMerge={true}
              id="rightLine"
              style={{ width: 'calc(80vw)', height: 'calc(60vh)' , marginTop: '5vh'}}
          />
        </div>
      </div>
    )
  }
}