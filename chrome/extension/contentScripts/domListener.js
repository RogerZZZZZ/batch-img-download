(() => {
  /**
   * Todo:
   * 1. add this file to watcher.
   * 2. move the file with webpack instead of shell command.
   * 3. split the file into modules.
   */
  const domParser = new DOMParser()

  let firstClick = null
  let secondClick = null
  let flag = false
  let order = 1

  const paintHelper = {
    flags: [],
    paintFlag: function (dom) {
      // Todo: paint the flag at the start and end location
      const icon = this.createFlag()
      dom.appendChild(icon)
    },
    clearPainting: () => {
      // Todo: remove the flags on the screen

    },
    paintImage: (dom) => {
      // Todo: add border around image.
      console.log(dom)
    },
    createFlag: () => {
      const name = flag ? 'begin' : 'end'
      const position = flag ? 'left: 0; top: 32px;' : 'right: 0; bottom: 32px;'
      return domParser.parseFromString(`<div style="position: relative; ${position} display: flex">
          <img src="./img/${name}.png" style="width: 32px; height: 32px"/>
          <span>${name}</span>
        </div>`, 'text/html').documentElement
    }
  }

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
  }

  const domHandler = () => {
    console.log(firstClick, secondClick)
    console.log(domHelper.findAncestor(firstClick, secondClick))
  }

  const clickHandler = (e) => {
    const node = e.target || e.srcElement
    if (!node) return

    if (!flag) {
      firstClick = node
    } else {
      secondClick = node
      order = domHelper.nodeInOrder(firstClick, secondClick)
      if (!order) {
        firstClick = [secondClick, firstClick = secondClick][0]
      }
      domHandler()
    }

    paintHelper.paintFlag(node)

    flag = !flag
  }

  window.document.addEventListener('click', clickHandler)
})()
