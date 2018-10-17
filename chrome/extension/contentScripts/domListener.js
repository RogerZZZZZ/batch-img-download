const domHelper = require('./lib/domHelper')
const painter = require('./lib/painter')

/**
 * Todo
 * 1. new tab to show images
 * 2. popup to control work flow
 *  2.1 select begin and end
 *  2,2 select one picturres
 * 3. get image url
 * 4. wrap the image with border
 * 5. provide batch download button
 *  5.1 support user to edit the image name.
 *  5.2 support user to select images to download.
 * 6. add shortcut for triggering extension.
 */

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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request)
  sendResponse({
    result: 'response: Bye Bye'
  })
})
