const pathHelper = {
  isPathRelative: (path) => {
    return /^(?:\/|[a-z]+:\/\/)/.test(path);
  },
  getCorrectUrl: function(url) {
    if(this.isPathRelative(url)) {
      var a = null
      return (function(url) {
        a = a || document.createElement('a')
        a.href = url
        return a.href
      })(url)
    } else {
      return url
    }
  }
}

export default pathHelper