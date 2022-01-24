import Vue from 'vue'

function toBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const res = reader.result.replace(/^data:.+;base64,/, '')
      const fileInfo = {
        name: file.name,
        type: file.name.split('.').pop(),
        size: Math.round(file.size / 1000) + ' kB',
        base64: res,
        data: reader.result,
        file
      }
      resolve(fileInfo)
    }
    reader.onerror = error => reject(error)
  })
}
Vue.prototype.$toBase64 = toBase64
