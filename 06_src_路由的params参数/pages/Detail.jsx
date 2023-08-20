import React from "react";
import {useMatch, useParams} from "react-router-dom";

export default function Detail() {
  // 使用 hook 获取路由参数
  const {id, title, content} = useParams();
  // const x = useMatch('/home/message/detail/:id/:title/:content')
  // console.log(x)

  return (<div>
    <ul>
      <li>消息编号：{id}</li>
      <li>消息标题：{title}</li>
      <li>消息内容：{content}</li>
    < /ul>
  </div>)
}