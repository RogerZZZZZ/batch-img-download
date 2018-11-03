import * as ImageAction from '../constants/ImageAction'

const initState = []

const actionMaps = {
  [ImageAction.ADD_IMAGES](state, action) {
    const maxId = state.reduce((maxId, el) => Math.max(el.id, maxId), -1) + 1
    console.log(action)
    // return state.concat(action)
  },
  [ImageAction.REMOVE_IMAGES](state, action) {
    return state.filter(el => el.id !== action.id)
  },
  [ImageAction.CLEAR_IMAGES]() {
    return []
  }
}

export default function images(state = initState, action) {
  const reduceFn = actionMaps[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}