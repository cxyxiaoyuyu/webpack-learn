// Loader 是转换模快的
// 多个loader 是有顺序的
module.exports = function(source,map,ast){
  console.log(source)
  return source
}