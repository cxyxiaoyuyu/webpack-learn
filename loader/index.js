// Loader 是转换模快的
// 多个loader 是有顺序的
module.exports = function(source,map,ast){
  // 拿到上一个loader处理的结果source 
  // 处理
  // 返回处理结果给下一个loader  一定要有返回值

  // const result = source.replace("hello","hello "+this.query.name)



  // return result

  // 官方推荐用this.callback() 返回多个信息
  this.callback(null,result)

  // this.callback( err,content,sourceMap,meta)
}