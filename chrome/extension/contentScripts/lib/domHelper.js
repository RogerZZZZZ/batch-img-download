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

    if ((position & Node.DOCUMENT_POSITION_FOLLOWING)
      || (position & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
      return -1
    } else if ((position & Node.DOCUMENT_POSITION_PRECEDING)
      || (position & Node.DOCUMENT_POSITION_CONTAINS)) {
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
  findTag: (root) => {
    //Todo find specific nodes in root
    console.log(root)
  },
}

export default domHelper
