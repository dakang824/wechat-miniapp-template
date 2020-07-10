/**
 * 克隆一个全新对象，但不能对dom对象和function
 * */
export let newObj = obj => JSON.parse(JSON.stringify(obj))
//判断开头是否http://或者https://的
export let isProtocol = str => {
  let b = new RegExp('^http[s]?://')
  return b.test(str)
}

/**
 * 合并路径
 * @param {string} baseURL 基础路径
 * @param {string} relativeURL 相对路径
 * @returns {string} 合并后的路径
 */
export const combineURLs = (baseURL, relativeURL) => {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
