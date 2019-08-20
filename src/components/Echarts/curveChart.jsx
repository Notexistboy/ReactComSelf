/**
 * echarts-曲线图
 * Seong Han
 * 2019.08.16
 */
import React , {Component} from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from "echarts";

export default class curveChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {},
      legendData: [],
      xAxisDatas: [],
      yAxisData: [],
      seriesData: [],
    }
  }
  componentDidMount () {
    this.setOption()
  }
  setOption = () => {
    this.getData()
    const { title } = this.props
    const { legendData, xAxisDatas, yAxisData, seriesData } = this.state
    let xAxisData = [ ...new Set( xAxisDatas ) ]
    const option = {
      title: {
        text: title,
      },
      legend: {
        orient: "horizontal",
        top:"10%",
        data: legendData,
      },
      grid : {
        top : "20%",    //距离容器上边界40像素
      },
      xAxis: {
        type: "category",
        data: xAxisData,
      },
      yAxis: yAxisData,
      series: seriesData,
    }
    this.setState({
       option,
      })
  }

  getData = () => {
    const { curveChart, descript, legend } = this.props
    const { legendData, xAxisDatas, yAxisData, seriesData } = this.state
    var color = ['#08c','#fa5','#c03', '#609','#703','#0fc'];
    //判断传入数据是几个
    //循环遍历数据
    let values= [];
    for(var key in curveChart){
      legendData.push(key);    
      values.push(curveChart[key]);//取得value
      for(var item in curveChart[key]){
        xAxisDatas.push(item)
      }
    }
    //遍历value中的数据
    var obj={}
    let offset = 0
    let yMaxArr = []
    let yMinArr = []
    let yMax,yMin,itemLength
    values.map((item,index) => {
      obj["data_"+index]=[]
      for(var it in values[index]){
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
          interval: Math.ceil(Math.max.apply(null, obj["data_"+index])/ 5),//刻度均匀分
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
      if(values.length<2){
        seriesData.push({
          name: legendData[index],
          data: obj["data_"+index],
          type: "line",
          smooth: this.smooth,
          itemStyle : { 
            normal : { 
              color:color[index], //改变折线点的颜色
              lineStyle:{ 
                color:color[index] //改变折线颜色
              },
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: "#fff" },
                { offset: 0, color: color[index] }
              ])
            }
          },//控制阴影部分
        })
        } else {
        seriesData.push({
          name: legendData[index],
          data: obj["data_"+index],
          type: "line",
          smooth: this.smooth,
          yAxisIndex: null,//多Y轴情况下显示右侧y轴刻度
          itemStyle : { 
            normal : { 
              color:color[index], //改变折线点的颜色
              lineStyle:{ 
                color:color[index] //改变折线颜色
              },
            }
          },
        })
      }
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
        debugger
        item['yAxisIndex']  = index //多Y轴情况下显示右侧y轴刻度
      })
    }
    this.setState({
      legendData,
      xAxisDatas,
      yAxisData,
      seriesData,
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
            style={{ width: 'calc(80vw)', height: 'calc(60vh)' , marginTop: '5vh'}}
        />
      </div>
    )
  }
}