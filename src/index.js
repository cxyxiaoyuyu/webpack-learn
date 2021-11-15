import css from "./css/index.less"
import pic from './images/logo.png'


console.log('css',css)   // 开启了css模快化 css才有值

const img = new Image()
img.src = pic
let app = document.getElementById('app')
app.append(img)

console.log('hello webpacsssssk')