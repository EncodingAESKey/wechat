function proxy(fn, context) {
  return function(){ 
      return fn.apply(context, arguments);
  }
}

module.exports = {
  proxy: proxy
}
