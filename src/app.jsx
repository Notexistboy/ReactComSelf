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
      annularData:  {'洪茂达':100,'中海油':50,'大鹏':20,'光汇石油':30,'华安':20},
      barChart: { '东城区':{'周一':100,'周二':45,'周三':65,'周四':85,'周五':25},
                  '西城区':{'周一':50,'周二':55,'周三':60,'周四':70,'周五':60},
                  '海淀区':{'周一':50,'周二':75,'周三':60,'周四':50,'周五':25}
                },
      fanChart: [{name:'现代材料', value:25, common:100},
                  {name:'现代材料', value:25, common:50},
                  {name:'现代材料', value:75, common:75}],
      curveChart: { '东城区':{'周一':100,'周二':45,'周三':65,'周四':85,'周五':25},
                    '西城区':{'周一':50,'周二':55,'周三':60,'周四':70,'周五':60},
                    '海淀区':{'周一':50,'周二':75,'周三':60,'周四':50,'周五':25}
                  },
      pieChart:  {'洪茂达':100,'中海油':50,'大鹏':20,'光汇石油':30,'华安':20},
      title: 'echarts测试',
      descript: true,
      legend: '降雨量(ml)',
    }
  }
  render () {
    const { annularData, barChart, fanChart, curveChart, pieChart, title, descript, legend } = this.state
    return (
      <div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* <AnnularChart annularData={annularData} title={title} />
              <BarChart barChart={barChart} descript={descript} title={title} legend={legend} /> */}
              <FanChart fanChart={fanChart} title={title} />
              {/* <CurveChart curveChart={curveChart} descript={descript} title={title} legend={legend} />
              <PieChart pieChart={pieChart} title={title} /> */}
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