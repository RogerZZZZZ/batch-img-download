const domHelper = require('./lib/domHelper')
const painter = require('./lib/painter')

let firstClick = null
let secondClick = null
let flag = false
let order = 1

console.log('trigger')

const domHandler = () => {
  console.log(firstClick, secondClick)
  console.log(domHelper.findAncestor(firstClick, secondClick))
}

const clickHandler = (e) => {
  const node = e.target || e.srcElement
  if (!flag) painter.clearPainting()
  if (!node) return

  painter.paintFlag(node, e.clientX, e.clientY, flag)

  if (!flag) {
    firstClick = node
  } else {
    secondClick = node
    order = domHelper.nodeInOrder(firstClick, secondClick)
    if (order > 0) {
      firstClick = [secondClick, secondClick = firstClick][0]
      painter.swapFlags()
    }
    domHandler()
  }
  flag = !flag
}

window.document.addEventListener('click', clickHandler)
