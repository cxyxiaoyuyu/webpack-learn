import css from "./css/index.less"
// import pic from './images/logo.png'


// console.log('css',css)   // 开启了css模快化 css才有值

// const img = new Image()
// img.src = pic
// let app = document.getElementById('app')
// app.append(img)

// console.log('hello webpacsssssk')

// import axios from 'axios'

// axios.get("api/info")


// css hmr
// var btn = document.createElement("button")
// btn.innerHTML = "新增"
// document.body.appendChild(btn)

// btn.onclick = function(){
//   var div = document.createElement('div')
//   div.innerHTML = "item"
//   document.body.appendChild(div)
// }

// ES6

// 引入polyfill
// import "@babel/polyfill"

// 实现按需加载 减少冗余
// 配置文件中添加 useBuiltIns: usage
// polyfill 的方法会污染全局对象 将生成的变量挂在window上

// const arr = [new Promise(()=>{}),new Promise(()=>{})]

// arr.map(item => console.log(item))


// React 
// import React, { Component } from "react"
// import ReactDom from "react-dom"

// class App extends Component {
//   render(){
//     return <div>hello world</div>
//   }
// }

// ReactDom.render(<App/>,document.getElementById('app'))

// Vue
// import Vue from "vue"
// console.log(Vue)
// const app = new Vue({
//   data: {
//     hello: "hello vue"
//   },
//   // template: '<div>Hello Vue</div>'
// }).$mount('#app')

import lodash from 'lodash'
console.log(lodash)

const _  = require("lodash")
console.log(_)