import React from 'react'
import {NavLink, useRoutes} from "react-router-dom";
import routes from './routes'
import Header from "./components/Header";

export default function App() {
  // 根据路由表生成对应的路由规则
  const element = useRoutes(routes)

  return (<div>
    <div className="row">
      <Header/>
    </div>
    <div className="row">
      <div className="col-xs-2 col-xs-offset-2">
        <div className="list-group">
          {/* 路由链接 */}
          <NavLink to="/about" className="list-group-item">About</NavLink>
          {/* end: 如果子路由匹配，自身会失去高亮 */}
          <NavLink to="/home" end className="list-group-item">Home</NavLink>
        </div>
      </div>
      <div className="col-xs-6">
        <div className="panel">
          <div className="panel-body">
            {/* 注册路由 */}
            {element}
          </div>
        </div>
      </div>
    </div>
  </div>)
}
