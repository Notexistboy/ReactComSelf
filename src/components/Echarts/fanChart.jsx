/**
 * echarts-扇形图
 * Seong Han
 * 2019.08.16
 */
import React , {Component} from 'react'

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