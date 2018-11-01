export const save = (images) => {
  chrome.storage.local.get('state', (obj) => {
    let { state } = obj
    state = JSON.parse(state)
    state = state ? (state.images || []) : []
    const newState = images.map(el => {
      return {
        src: el,
        text: '',
      }
    })
    state = [...new Set(state.concat(newState))]
    const store = {images: state}
    chrome.storage.local.set({ state: JSON.stringify(store) })
  })
}

export default {
  save
}
