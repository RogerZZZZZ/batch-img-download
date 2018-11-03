export const save = (images) => {
  chrome.storage.local.get('state', (obj) => {
    let { state } = obj
    state = state ? (JSON.parse(state).images || []) : []
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

export const deleteObj = (idx) => {
  chrome.storage.local.get('state', (obj) => {
    let { state } = obj
    state = JSON.parse(state)
    state.images.splice(idx, 1)
    chrome.storage.local.set({ state: JSON.stringify(store) })
  })
}

export default {
  save
}
