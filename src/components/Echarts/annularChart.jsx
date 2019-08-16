/**
 * echarts-圆环图
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
  test = () => {
    const { test } =this.props;
    console.log(test)
  }
  render() {
    return (
      <div>
        {this.test()}
      </div>
    )
  }
}