(function () {
  const domHelper = require('./lib/domHelper')
  const painter = require('./lib/painter')
  
  let firstClick_ = null
  let secondClick_ = null
  let flag_ = false
  let controlFlag_ = false
  let config_ = null
  
  console.log('trigger')
  
  const domHandler = function() {
    console.log(firstClick_, secondClick_)
    const ancestor = domHelper.findAncestor(firstClick_, secondClick_)
    const conf = config_ || config_.checked || ['img']
    const imgs = domHelper.getImgs(ancestor, firstClick_, secondClick_, conf)
  }
  
  const clickHandler = (e) => {
    if (!controlFlag_) return
    const node = e.target || e.srcElement
    if (!flag_) painter.clearPainting()
    if (!node) return
  
    painter.paintFlag(node, e.clientX, e.clientY, flag_)
  
    if (!flag_) {
      firstClick_ = node
    } else {
      secondClick_ = node
      const order = domHelper.nodeInOrder(firstClick_, secondClick_)
      if (order > 0) {
        firstClick_ = [secondClick_, secondClick_ = firstClick_][0]
        painter.swapFlags()
      }
      controlFlag_ = false
      domHandler()
    }
    flag_ = !flag_
  }
  
  window.document.addEventListener('click', clickHandler)
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    this.config = request
    controlFlag_ = true
    sendResponse({
      result: 'response: Bye Bye'
    })
  })
})()