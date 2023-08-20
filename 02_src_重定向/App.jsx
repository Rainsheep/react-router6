import React, {Component} from 'react'
import {NavLink, Route, Routes, Navigate} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

export default class App extends Component {
  render() {
    return (<div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="page-header"><h2>React Router Demo</h2></div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/* 路由链接 */}
            <NavLink to="/about" className="list-group-item">About</NavLink>
            <NavLink to="/home" className="list-group-item">Home</NavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              {/* 注册路由 */}
              {/* 必须用 Routes 包裹 */}
<Routes>
  <Route path="/about" element={<About/>}></Route>
  <Route path="/home" element={<Home/>}></Route>
  <Route path="/" element={<Navigate to="/about"/>}></Route>
</Routes>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}
