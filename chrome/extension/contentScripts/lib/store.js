const uniqueElementsBy = (arr, fn) => {
  return arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v)
    return acc
  }, [])
}

export const save = (images) => {
  chrome.storage.local.get('state', (obj) => {
    let { state } = obj
    state = state ? (JSON.parse(state).images || []) : []
    let maxId = state.reduce((max, el) => max = max > el.id ? max : el.id, 0) + 1
    const newState = images.map(el => {
      return {
        src: el,
        id: maxId++
      }
    })
    state = uniqueElementsBy(state.concat(newState), (a, b) => a.src === b.src)
    const store = {images: state}
    chrome.storage.local.set({ state: JSON.stringify(store) })
  })
}

export const deleteObj = (idx) => {
  chrome.storage.local.get('state', (obj) => {
    let { state } = obj
    state = JSON.parse(state)
    state.images.splice(idx, 1)
    chrome.storage.local.set({ state: JSON.stringify(store) })
  })
}

export const clearStorage = () => chrome.storage.local.clear()

export default {
  save,
  deleteObj,
  clearStorage,
}
