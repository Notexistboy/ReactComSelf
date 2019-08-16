/**
 * echarts-饼状图
 * Seong Han
 * 2019.08.16
 */
import React , {Component} from 'react'

export default class pieChart extends Component {
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
    return (
      <div>
        {/* <ReactEcharts
            option={chartDatas}
            lazyUpdate={true}
            notMerge={true}
            id="rightLine"
            style={{ width: 'calc(80vw)', height: 'calc(60vh)' , marginTop: '5vh'}}
        /> */}
      </div>
    )
  }
  getData = () => {
    //const {  } =this.props;
    //this.setState({})
  }

  render() {
    return (
      <div>
        {this.setOption()}
      </div>
    )
  }
}