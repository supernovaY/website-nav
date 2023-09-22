
// 返回单个省市name与code
export function filteCity (code) {
  let _item = {
    code: [],
    name: ''
  }
  if (!code) return _item
  const province = code.substr(0, 2) + '0000'
  _item.code = [province, code]
  const city_data = localStorage.getItem('city_data') ? JSON.parse(localStorage.getItem('city_data')) : []
  city_data.forEach(item => {
    if (item.key === province) {
      item.optionTreeList.forEach(subItem => {
        if (subItem.key === code) {
          _item.name = subItem.value
        }
      })
    }
  })
  return _item
}

// 查询项目name
export function filteProject (id) {
  let _item = {}
  const projects_data = sessionStorage.getItem('projects_data') ? JSON.parse(sessionStorage.getItem('projects_data')) : []
  projects_data.forEach(item => {
    if (item.id === id) _item = item
  })
  return _item
}