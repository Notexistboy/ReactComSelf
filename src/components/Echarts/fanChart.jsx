/**
 * echarts-扇形图
 * Seong Han
 * 2019.08.16
 */
import React , {Component} from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from "echarts";

export default class fanChart extends Component {
  constructor(props) {
    super(props);
    this.props = {
    };
    this.state = {

    }
  }
  setOption = () => {
    this.getData()
    //var chartDatas = { }

  }
  getData = () => {
    const { fanChart } = this.props
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}