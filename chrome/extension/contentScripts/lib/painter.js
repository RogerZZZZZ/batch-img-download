const domHelper = require('./domHelper')

const painter = {
  flags: [],
  flagSize: 24,
  paintFlag: function (dom, offsetX, offsetY, flag) {
    const icon = this.createFlag(flag)
    icon.style.left = `${offsetX - dom.getBoundingClientRect().left - (this.flagSize / 2)}px`
    icon.style.top = `${offsetY - dom.getBoundingClientRect().top - (this.flagSize / 2)}px`
    this.flags.push(icon)
    dom.appendChild(icon)
    const style = domHelper.getStyle(dom, 'position')
    if (!style || style === 'static') dom.style.position = 'relative'
  },
  clearPainting: function () {
    this.flags.map(el => el.remove())
    this.flags = []
  },
  swapFlags: function () {
    if (this.flags.length !== 2) return
    const [a, b] = this.flags
    a.getElementsByTagName('img')[0].setAttribute('src', this.imgUrl('end'))
    b.getElementsByTagName('img')[0].setAttribute('src', this.imgUrl('begin'))
  },
  paintImage: (dom) => {
    // Todo: add border around image.
    console.log(dom)
  },
  createFlag: function (flag) {
    const name = !flag ? 'begin' : 'end'
    const url = this.imgUrl(name)
    return domHelper.htmlToElement(`<div style="position: absolute; display: flex; z-index: 9999;">
          <img src="${url}" style="width: ${this.flagSize}px; height: ${this.flagSize}px; background: none;"/>
        </div>`, 'text/html')
  },
  imgUrl: name => chrome.runtime.getURL(`img/${name}.png`),
}

export default painter
