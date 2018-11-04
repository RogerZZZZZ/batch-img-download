/**
 * Contain functions to download files.
 */
import saveAs from 'file-saver'

const getFileFormat = (name) => {
  const arr = name.split('.')
  return arr[arr.length - 1]
}

export const downloadFromUrl = (url, idx) => {
  return new Promise(resolver => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const blob = new Blob([xhr.response], {
          type: xhr.getResponseHeader('Content-Type')
        })
        saveAs(blob, `${idx + 1}.${getFileFormat(url)}`)
        resolver(xhr.response)
      }
    }
    xhr.open('GET', url, true)
    xhr.responseType = "arraybuffer"
    // TODO: CORS problem
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
    xhr.send()
  })
}