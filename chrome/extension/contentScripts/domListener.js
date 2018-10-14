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

  const clickHandler = (e) => {
    const path = e.path
    const node = path.length ? path[0]: null
    if (!node) return

    if (!flag) {
      firstClick = node
    } else {
      secondClick = node
      domHandler()
    }
    flag = !flag
  }

  const domHelper = {
    contain: (refNode, otherNode) => {
      if (!otherNode || !refNode) return false
      let node = otherNode.parentNode
      do {
        if (node === refNode) {
          return true
        } else {
          node = node.parentNode
        }
      } while (node !== null)
      return false
    },
    findAncestor: function(node1, node2) {
      if (node1 === node2 || this.contain(node1, node2)) return node1
      let pNode = node1.parentNode
      do {
        if (pNode, node2) return pNode
        pNode = pNode.parentNode
      } while (parentNode !== null)
      return null
    },
    nodeInOrder: (node1, node2) => {
      // Todo: find out whether the nodes is in order

    },
  }

  const paintHelper = {
    flags: [],
    paintFlag: (dom) => {
      // Todo: paint the flag at the start and end location

    },
    clearPainting: () => {
      // Todo: remove the flags on the screen

    },
    paintImage: (dom) => {
      // Todo: add border around image.

    },
  }

  const domHandler = () => {
    console.log(firstClick, secondClick)
    console.log(domHelper.findAncestor(firstClick, secondClick))
  }

  window.document.addEventListener('click', clickHandler)
})()
