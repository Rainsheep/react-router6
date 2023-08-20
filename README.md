# 1. 概述

1. React Router 以三个不同的包发布到 npm 上，它们分别为：
1. react-router：路由的核心库，提供了很多的：组件、钩子。
2. **react-router-dom：包含 react-router 所有内容，并添加一些专门用于 DOM 的组件，例如**
   **`<BrowserRouter>` 等**。
3. react-router-native：包括 react-router 所有内容，并添加一些专门用于 ReactNative 的 API，例如： `<NativeRouter>` 等，

2. 与 React Router5.x 版本相比，改变了什么？
    1. 内置组件的变化：移除 `<Switch/>`，新增 `<Routes/>` 等。
    2. 语法的变化：`component={About}` 变为 `element={<About/>}` 等。
    3. 新增多个 hook：useParams、useNavigate、useMatch等。
    4. **官方明确推荐函数式组件了**！！！



# 2. Component

## 2.1 BrowserRouter

`<BrowserRouter>` 用于包裹整个应用。

```react
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from "react-router-dom";
import App from './App'

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>,
    document.getElementById('root'))
```



## 2.2 HashRouter

1. 说明：作用与 `<BrowserRouter>` 一样，但 `<HashRouter>` 修改的是地址栏的 hash 值。
2. 备注：6.x版本中 `<HashRouter>` 、  `<BrowserRouter>` 的用法与 5.x 相同。

## 2.3 Routers 与 Router

1. v6 版本中移出了先前的 `<switch>`，引入了新的替代者：`<Routes>`

2. `<Routes>` 和 `<Route>` 要配合使用，且必须要用 `<Routes>` 包裹 `<Route>`

3. `<Route>` 相当于一个 if 语句，如果其路径与当前 URL 匹配，则呈现其对应的组件。

4.  `<Route caseSensitive>` 属性用于指定：匹配时是否区分大小写（默认为false）。

5. 当 URL 发生变化时，`<Routes>` 都会查看其所有子 `<Route>` 元素以找到最佳匹配并呈现组件。

6.  `<Route>` 也可以嵌套使用，且可配合 `useRoutes()`配置 “路由表”，但需要通过 `<Outlet>` 组件来渲染其子路由。

7. 示例代码

   ```react
   <Routes>
       /*path属性用于定义路径，element属性用于定义当前路径所对应的组件*/
       <Route path="/login" element={<Login />}></Route>
   
       /*用于定义嵌套路由，home是一级路由，对应的路径/home*/
       <Route path="home" element={<Home />}>
           /*test1和 test2 是二级路由，对应的路径/home/test1 或 /home/test2*/
           <Route path="test1" element={<Test/>}></Route>
           <Route path="test2" element={<Test2 />}></Route>
       </Route>
   
       //Route也可以不写element属性，这时就是用于展示嵌套的路由。所对应的路径是/users/xxx
       <Route path="users">
           <Route path="xxx" element={<Demo />} />
       </Route>
   </Routes>
   ```

## 2.4 Link

1. 作用：修改 URL，且不发送网络请求（路由链接）。

2. 注意：外侧需要用 `<BrowserRouter>` 或 `<HashRouter>` 包裹。

3.  示例代码

```react
import { Link } from "react-router-dom"；
function Test() {
  return (
    <div>
      <Link to="/路径">钮</Link>
    </div>
  );
}
```



## 2.5 NavLink

1. 作用：与 `<Link>` 组件类似，且可实现导航的高亮效果。

2. 示例代码：

   ```react
   // 注意：NavLink默认类名是active，下面是指定自定义的class
   //自定义样式
   <NavLink
     to="login"
     className={({ isActive }) => {
         console.log('home'， isActive)
         return isActive ? 'base one'：'base'
     }}
   >login</NavLink>
   /*
     默认情况下，当Home的子组件匹配成功，Home的导航也会高亮，
     当NavLink上添加了end属性后，若Home的子组件匹配成功，则Home的导航没有高亮效果。
   */
   <NavLink to="home" end >home</Navlink>
   ```



## 2.6 Navigate

1. 作用：只要 `<Navigate>` 组件被渲染，就会修改路径，切换视图。

2. replace 属性用于控制跳转模式（push 或 replace，默认是 push）。

3. 示例代码

   ```react
   import React, {useState} from "react";
   import {Navigate} from 'react-router-dom'
   
   export default function Home() {
     const [sum, setSum] = useState(1)
     return (<div>
       <h3>我是Home的内容</h3>
       {sum === 2 ? <Navigate to="/about" replace/> : <h4>当前sum 值是: {sum}</h4>}
       <button onClick={() => setSum(2)}>点我将 sum 变为 2</button>
     </div>)
   }
   ```

   ```react
   <Routes>
     <Route path="/about" element={<About/>}></Route>
     <Route path="/home" element={<Home/>}></Route>
     <Route path="/" element={<Navigate to="/about"/>}></Route>
   </Routes>
   ```

   navigate 实现高亮

   ```react
   export default function App() {
     function computeClassName({isActive}) {
       return isActive ? 'list-group-item atguigu' : 'list-group-item'
     }
   
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
             <NavLink to="/about" className={computeClassName}>About</NavLink>
             <NavLink to="/home" className={computeClassName}>Home</NavLink>
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
   ```



## 2.7 Outlet

1. 当 `<Route>` 产生嵌套时，渲染其对应的后续子路由。

2. 示例代码

   ```react
   // 路由表
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
   ```

   ```react
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
   ```

   ```react
   export default function Home() {
     console.log('###', useOutlet())
     return (<div>
       <h2>Home组件内容</h2>
       <div>
         <ul className="nav nav-tabs">
           <li>
             <NavLink className="list-group-item" to="news">News</NavLink>
           </li>
           <li>
             <NavLink className="list-group-item" to="message">Message</NavLink>
           </li>
         </ul>
         {/* 指定路由组件呈现的位置 */}
         <Outlet/>
       </div>
     </div>)
   }
   ```

## 3. Hooks

## 3.1 useRoutes()

1. 作用：根据路由表，动态创建 `<Routes>` 和 `<Route>`

2. 示例代码

   src/routes/index.jsx

   ```
   import About from "../pages/About";
   import Home from "../pages/Home";
   import {Navigate} from "react-router-dom";
   import React from "react";
   
   export default [{path: '/about', element: <About/>},
     {path: '/home', element: <Home/>},
     {path: '/', element: <Navigate to="/about"/>}]
   ```

   App.jsx

   ```react
   import React from 'react'
   import {NavLink, useRoutes} from "react-router-dom";
   import routes from './routes'
   
   export default function App() {
     // 根据路由表生成对应的路由规则
     const element = useRoutes(routes)
   
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
               {element}
             </div>
           </div>
         </div>
       </div>
     </div>)
   }
   ```



## 3.2 useNavigate()

1. 作用：返回一个函数用来实现编程式导航。

2. 示例代码：

   ```react
   import React from 'react'
   import {useNavigate} from 'react-router-dom'
   
   export default function Demo() {
     const navigate = useNavigate()
     const handle = () => {
       //第一种使用方式:指定具体的路径
       navigate('/login', {
         replace: false,
         state: {a: 1, b: 2}
       })
   
       //第二种使用方式:传入数值进行前进或后退,类似于5.x中的history.go()方法
       navigate(-1)
       return (
           <div>
             <button onClick={handle}>按钮</button>
           </div>
       )
     }
   }
   ```

## 3.3 useParams()

1. 作用：回当前匹配路由的 params 参数，类似于 5.x 中的 `match.params`

2. 示例代码：

   ```react
   import React from 'react'
   import {Routes, Route, useParams} from 'react-router-dom'
   import User from './pages/User.jsx'
   
   function ProfilePage() {
   //获取URL中携带过来的params参数
     let {id} = useParams()
   }
   
   function App() {
     return (<Routes>
       <Route path="users/:id" element={<User/>}/>
     </Routes>);
   }
   ```

## 3.4 useSearchParams()

1. 作用：用于读取和修改当前位置的 URL 中的查询字符串。

2. 返回一个包含两个值的数组，内容分别为：当前的 seaech 参数、更新 search 的函数。

3. 示例代码

   ```react
   import React from "react";
   import {useLocation, useSearchParams} from "react-router-dom";
   
   export default function Detail() {
     const [search, setSearch] = useSearchParams()
     const id = search.get('id')
     const title = search.get('title')
     const content = search.get('content')
   
     return (<div>
       <ul>
         <li>
           <button onClick={() => setSearch(
               'id=008&title=哈哈&content=嘻嘻')}>点我更新一下收到的 search 参数
           </button>
         </li>
         <li>消息编号：{id}</li>
         <li>消息标题：{title}</li>
         <li>消息内容：{content}</li>
       < /ul>
     </div>)
   }
   ```



## 3.5 useLocation()

1. 作用：获取当前 location 信息，对标 5.x 中的路由组件的 location 属性。

2. 示例代码：

   ```react
   const x = useLocation()
   console.log('@', x)
   
   // x就是1ocation对象：
   /*
     {
       hash: ""，
       key: "ah9nv6sz"，
       pathname": /login"，
       search: "?name=zs&age=18"，
       state: {a:1， b:2}
     }
   */
   ```

## 3.6 useMatch()

1. 作用：返回当前匹配信息，对标 5.x 中的路由组件的 match 属性。

2. 示例代码：

   ```react
   const match = useMatch('/login/:x/:y')
   console.log(match)//输出match对象
   // match对象内容如下
   /*
     {
       params: {x:'1'， y:'10'},
       pathname: "/Login/1/10",
       pathnameBase: "/Login/1/10",
       pattern: {
         path:'/1ogin/:x/:y',
         caseSensitive:false,
         end:false
       }
     }
   */
   ```

## 3.7 useInRouterContext()

作用：如果组件在 `<Router>` 的上下文中呈现，则 useInRouterContext 钩子返回 true，否则返回 false。

## 3.8 useNavigationType()

1. 作用：返回当前的导航类型（用户是如何来到当前页面的）。
2. 返回值：POP、PUSH、REPLACE
3. 备注：POP 是指在浏览器中直接打开了这个路由组件（刷新页面）。

## 3.9 useOutlet()

1. 作用：用来呈现当前组件中要渲染的嵌套路由。

2. 示例代码：

   ```react
   const result = useOutlet()
   console.log(result)
   // 如果嵌套路由没有挂载，则result为null
   // 如果嵌套路由已经挂载，则展示嵌套的路由对象
   ```

## 3.10 useResolvedPath()

1. 作用：给定一个 URL 值，解析其中的：path、search、hash 值。