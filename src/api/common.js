import services from '@/utils/services';

const _wp = '/wp';

const _dcm = '/dc-wisdom-manager/web'
const _dcs = '/dc-sales'
const _wk = '/wk-dc-sys'
const _master = '/dc-master-data';

export const uploadUrl = `${_wp}/material/v2/upload`

// 项目名称
export const getProjects = () => services.json(`${_wk}/project/getProjectAndErpList`, {}, {
  action: '项目名称'
})

// 门户接口
export const postListPortalByPerUserId = () => services.json(`${_wk}/portal/listPortalByPerUserId`, {}, {
  action: '门户'
})

// 根据项目id获取楼盘
export const getPremisesNameList = params => services.json(`${_master}/v2/wp/premises/nameList`, params, {
  action: '根据项目id获取楼盘'
})

// 生成小程序码-太阳码
export const postQueryMyQrCode = params => services.json(`${_dcs}/app/marketing/user/queryMyQrCode`, params, {
  action: '二维码'
})

// 城市-树形
export const getCityTree = () => services.get(`${_master}/api/option/city/tree`, { action: '城市列表' })

// 字典表
export const getDictionaryType = params => services.get(`${_master}/api/option/dictionary/type`, { params, action: '字典表' })