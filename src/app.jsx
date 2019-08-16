import React from 'react'
//import {Route, Switch, Redirect} from 'react-router-dom'
//import MyNavLink from './components/my-nav-link'
import AnnularChart from './components/Echarts/annularChart.jsx'//环形图
import BarChart from './components/Echarts/barChart.jsx'//柱状图
import FanChart from './components/Echarts/fanChart.jsx'//扇形图
import CurveChart from './components/Echarts/curveChart.jsx'//折线图
import PieChart from './components/Echarts/pieChart.jsx'//饼状图

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      annularData: [{ name: '装备制造', value: 54},{ name: '现代材料', value: 44 },{ name: '新能源', value: 35 },
                    { name: '新一代信息技术', value: 30 },{ name: '商贸物流', value: 20 }],
      title:'echarts测试',
    }
  }
  render () {
    const { annularData, title } = this.state
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <h2>React Router Demo</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              <AnnularChart annularData={annularData} title={title}/>
              <BarChart />
              <FanChart />
              <CurveChart />
              <PieChart />
              {/*导航路由链接*/}
              {/* <MyNavLink className="list-group-item" to='/about' >About</MyNavLink>
              <MyNavLink className="list-group-item" to='/admin'>Admin</MyNavLink>
              <MyNavLink className="list-group-item" to='/repos'>Repos</MyNavLink> */}
            </div>
          </div>
      {/* <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {//可切换的路由组件,路由页}
                {/* <Switch>
                  <Route path='/about' component={About} />
                  <Route path='/admin' component={Admin} />
                  <Route path='/repos' component={Repos} />
                  <Redirect to='/about' />
                //</Switch>}

              </div>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}