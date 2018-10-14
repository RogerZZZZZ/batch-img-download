(() => {
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
  }

  const domHandler = () => {
    console.log(firstClick, secondClick)
    console.log(domHelper.findAncestor(firstClick, secondClick))
  }

  window.document.addEventListener('click', clickHandler)
})()
