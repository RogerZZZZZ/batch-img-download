import * as types from '../constants/ImageAction'

export function addImages(images) {
  return {
    type: types.ADD_IMAGES,
    images,
  }
}

export function removeImage(image) {
  return {
    type: types.REMOVE_IMAGES,
    image,
  }
}
