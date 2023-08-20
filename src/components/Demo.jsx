import React from 'react'
import {Routes, Route, useParams} from 'react-router-dom'
import User from './pages/User.jsx'

function ProfilePage() {
//获取URL中携带过来的params参数
  let {id} = useParams()
}


function App() {
  return (<Routes>
    <Route path="users/：id" element={<User/>}/>
  </Routes>);
}