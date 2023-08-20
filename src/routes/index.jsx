import About from "../pages/About";
import Home from "../pages/Home";
import News from "../pages/News";
import Message from "../pages/Message";
import {Navigate} from "react-router-dom";
import React from "react";
import Detail from "../pages/Detail";

export default [
  {
    path: '/about',
    element: <About/>
  },
  {
    path: '/home',
    element: <Home/>,
    children: [
      {
        path: 'news',
        element: <News/>
      },
      {
        path: 'message',
        element: <Message/>,
        children: [{
          path: 'detail',
          element: <Detail/>
        }]
      }]
  },
  {
    path: '/',
    element: <Navigate to="/about"/>
  }]