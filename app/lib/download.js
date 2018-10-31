/**
 * Contain functions to download files.
 */

export const downloadFromUrl = (url) => {
  return new Promise(resolver => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const blob = new Blob([xhr.response], {
          type: xhr.getResponseHeader('Content-Type')
        })
        const imgUrl = window.URL.createObjectURL(blob)
        document.getElementById('hidden-image').src = imgUrl
        resolver(xhr.response)
      }
    }
    console.log('download1111', url)
    xhr.responseType = "arraybuffer";
    xhr.open('GET', url, true)
    xhr.send()
  })
}