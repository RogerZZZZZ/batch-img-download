export const save = (images) => {
  chrome.storage.local.get('state', (obj) => {
    let { state } = obj
    state = state ? (state.images || []) : []
    let maxId = state.reduce((maxId, item) => Math.max(maxId, item), -1) + 1
    const newState = images.map(el => {
      return {
        id: maxId++,
        src: el,
        text: '',
      }
    })
    state = state.concat(newState)
    const store = state ? {images: state} : {}
    chrome.storage.local.set({ state: JSON.stringify(store) })
  })
}

export default {
  save
}
