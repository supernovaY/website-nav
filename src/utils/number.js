export default {
  /**
   * 加上千位分隔符
   * @param  {number} val
   */
  separator(val, split = ',') {
    if (!val) return '0'

    const arr = (val += '').split('.')
    const rgx = /(\d+)(\d{3})/
    while (rgx.test(arr[0])) {
      arr[0] = arr[0].replace(rgx, '$1' + split + '$2')
    }
    return arr.join('.')
  },
  /**
   * 格式化百分比数值
   * @param  {number} val
   */
  toPerc(val) {
    return module.exports.toFixed(val * 100, 2) + '%'
  }
}