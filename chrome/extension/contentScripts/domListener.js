(() => {
  /**
   * Todo:
   * 1. add this file to watcher.
   * 2. move the file with webpack instead of shell command.
   * 3. split the file into modules.
   */
  let firstClick = null
  let secondClick = null
  let flag = false
  let order = 1

  const domHelper = {
    contain: (refNode, otherNode) => {
      if (!otherNode || !refNode) return false
      let node = otherNode.parentNode
      do {
        if (node === refNode) {
          return true
        }
        node = node.parentNode
      } while (node !== null)
      return false
    },
    findAncestor: function findAncestor(node1, node2) {
      if (node1 === node2 || this.contain(node1, node2)) return node1
      let pNode = node1.parentNode
      do {
        if (this.contain(pNode, node2)) return pNode
        pNode = pNode.parentNode
      } while (pNode !== null)
      return null
    },
    nodeInOrder: (node1, node2) => {
      if (node1 === node2) return 0

      const position = node1.compareDocumentPosition(node2)

      if ((position && Node.DOCUMENT_POSITION_FOLLOWING)
        || (position && Node.DOCUMENT_POSITION_CONTAINED_BY)) {
        return -1
      } else if ((position && Node.DOCUMENT_POSITION_PRECEDING)
        || (position && Node.DOCUMENT_POSITION_CONTAINS)) {
        return 1
      }
      return 0
    },
    htmlToElement: (html) => {
      const template = document.createElement('template')
      template.innerHTML = html.trim()
      return template.content.firstChild
    },
    getStyle: (el, styleProp) => {
      const defaultView = (el.ownerDocument || document).defaultView
      if (defaultView && defaultView.getComputedStyle) {
        const prop = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
        return defaultView.getComputedStyle(el, null).getPropertyValue(prop)
      }
      return el.currentStyle[styleProp]
    },
  }

  const paintHelper = {
    flags: [],
    paintFlag: function (dom) {
      const icon = this.createFlag()
      this.flags.push(icon)
      dom.appendChild(icon)
      const style = domHelper.getStyle(dom, 'position')
      if (!style || style === 'static') dom.style.position = 'relative'
    },
    clearPainting: function () {
      this.flags.map(el => el.remove())
    },
    paintImage: (dom) => {
      // Todo: add border around image.
      console.log(dom)
    },
    createFlag: () => {
      const name = !flag ? 'begin' : 'end'
      const position = !flag ? 'left: 0; top: -24px;' : 'right: 0; bottom: -24px;'
      const url = chrome.runtime.getURL(`img/${name}.png`)
      return domHelper.htmlToElement(`<div style="position: absolute; ${position} display: flex; z-index: 9999;">
          <img src="${url}" style="width: 24px; height: 24px; background: none;"/>
        </div>`, 'text/html')
    }
  }

  const domHandler = () => {
    console.log(firstClick, secondClick)
    console.log(domHelper.findAncestor(firstClick, secondClick))
  }

  const clickHandler = (e) => {
    const node = e.target || e.srcElement
    if (!node) return

    if (!flag) {
      paintHelper.clearPainting()
      firstClick = node
    } else {
      secondClick = node
      order = domHelper.nodeInOrder(firstClick, secondClick)
      if (!order) firstClick = [secondClick, secondClick = firstClick][0]
      domHandler()
    }

    paintHelper.paintFlag(node)

    flag = !flag
  }

  window.document.addEventListener('click', clickHandler)
})()
