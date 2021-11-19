module.exports = function(source){
  const code = ` 
    const ele = document.createElement('style')
    ele.innerText = ${JSON.stringify(source)}
    document.head.appendChild(ele)
  `
  return code
}