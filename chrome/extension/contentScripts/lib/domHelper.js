import pathHelper from './pathHelper'

const domHelper = {
  imgCollections: [],
  beginFlag: false,
  endFlag: false,
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
  getImgs: function (root, begin, end, types) {
    this.imgCollections = []
    this.beginFlag = false
    this.endFlag = false
    if (begin === end) {
      this.walkDom(root, types, null, null)
      return
    }
    this.walkDom(root, types, begin, end)
    return this.deleteDuplication(this.imgCollections)
  },
  getImgsInOne: function (root, types) {
    this.walkDom(root, types, null, null)
    return this.deleteDuplication(this.imgCollections)
  },
  deleteDuplication: (arr) => [...new Set(arr)],
  walkDom: function(node, types, begin, end) {
    if (this.endFlag) return
    if (node === begin) this.beginFlag = true
    if (node === end) {
      this.beginFlag = false
      this.endFlag = true
      return
    }

    this.extractImgPath(node, types)

    node = node.firstChild
    while(node) {
      this.walkDom(node, types, begin, end)
      node = node.nextSibling
    }
  },
  extractImgPath: function (node, types) {
    const tag = node.tagName
    if (types.indexOf('Image') > -1 && tag === 'IMG') {
      const style = window.getComputedStyle(node, false)
      if (style.display.toString() !== 'none' && style.visibility.toString() !== 'hidden') {
        const url = node.getAttribute('src')
        if (url && url !== '') {
          this.imgCollections.push(pathHelper.getCorrectUrl(url))
          node.style.border = '2px solid #0366d6'
        }
      }
    }
    if (types.indexOf('Background') > -1) {
      const style = node.currentStyle || window.getComputedStyle(node, false)
      const imgStyle = style.backgroundImage
      if (imgStyle) {
        const url = imgStyle.slice(4, -1).replace(/"/g, "")
        if(url) this.imgCollections.push(pathHelper.getCorrectUrl(url))
      }
    }
  }
}

export default domHelper
