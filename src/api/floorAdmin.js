/**
 *楼盘管理
 *
 */
import services from '@/utils/services';
const schema = `/dc-sales/web/distribution`;
const _schema = `/dc-master-data/v2/wp`;
export default {
  // 楼盘信息列表
  getPremisesPage: `${_schema}/premises/page`,

  // 检查项目名称是否已关联
  getPreCheck: id => services.get(`${_schema}/premises/pre-check/${id}`, {
    action: '选择项目名称'
  }),

  // 新建楼盘
  postPremisesSave: params => services.json(`${_schema}/premises/save`, params, {
    action: '新建楼盘'
  }),

  // 楼盘详情
  getPremisesDetail: id => services.get(`${_schema}/premises/detail/${id}`, {
    action: '楼盘详情'
  }),

  // 楼盘上架
  putPremisesUp (params) {
    return services.put(`${_schema}/premises/up/${params}`, {}, {
      action: '楼盘上架'
    });
  },

  // 楼盘下架
  putPremisesDown (params) {
    return services.put(`${_schema}/premises/down/${params}`, {}, {
      action: '楼盘上架'
    });
  },

  /**
   * 楼盘信息列表
   * @param params
   */
  selectProductByPage (params) {
    return services.json(`${schema}/product/selectProductByPage`, params);
  },

  /**
  * 新增楼盘
  * @param params
  *
  */
  addPremises (params) {
    return services.json(`${schema}/product/addPremises`, params);
  },

  /**
  * 判断项目名称是否能用
  * @param params
  *
  */
  checkProjectId (params) {
    return services.get(`${schema}/product/checkProjectId`, { params });
  },


  /**
  * 楼盘详情
  * @param params
  *
  */
  findPremisesById (params) {
    return services.get(`${_schema}/premises/detail/${params}`, {}, {
      action: '楼盘详情'
    });
  },

  /**
   * 楼盘修改
   * @param params
   *
   */
  updatePremises (params) {
    return services.json(`${schema}/product/updatePremises`, params);
  },



  /**
  * 楼栋列表
  * @param params
  *
  */
  selectBuildingByPage (params) {
    return services.json(`${schema}/building/selectBuildingByPage`, params);
  },
  /**
  * 新增楼栋列表 楼盘下拉框接口
  * @param params
  *
  */
  selectPremisesList (params) {
    return services.json(`${schema}/product/selectPremisesList`, params);
  },
  /**
  * 新增楼栋接口
  * @param params
  *
  */
  addBuilding (params) {
    return services.json(`${schema}/building/addBuilding`, params);
  },
  /**
   * 楼栋修改接口
   * @param params
   *
   */
  updateBuilding (params) {
    return services.json(`${schema}/building/updateBuilding`, params);
  },
  /**
  * 楼栋查看详情接口
  * @param params id
  *
  */
  findBuildingById (params) {
    return services.get(`${schema}/building/findBuildingById`, { params });
  },
  /**
  * 楼栋删除接口
  * @param params id
  *
  */
  deleteBuildingByID (params) {
    return services.get(`${schema}/building/deleteBuildingByID`, { params });
  },

  /**
  * 户型列表接口
  * @param params
  *
  */
  selectHouseByPage (params) {
    return services.json(`${schema}/house/selectHouseByPage`, params);
  },
  /**
  * 新增户型接口
  * @param params
  *
  */
  addHouse (params) {
    return services.json(`${schema}/house/addHouse`, params);
  },
  /**
  * 修改户型接口
  * @param params
  *
  */
  updateHouse (params) {
    return services.json(`${schema}/house/updateHouse`, params);
  },
  /**
  * 删除户型接口
  * @param params
  *
  */
  deleteHouseByID (params) {
    return services.get(`${schema}/house/deleteHouseByID`, { params });
  },
  /**
  * 户型详情接口
  * @param params
  *
  */
  findHouseById (params) {
    return services.get(`${schema}/house/findHouseById`, { params });
  },


  /**
  * 标签列表接口 分类(1:楼盘 2:户型 3：资讯) 用在各列表
  * @param params
  *
  */
  selectTagList (params) {
    return services.json(`${schema}/tag/selectTagList`, params);
  },

  /**
  * 标签列表接口
  * @param params
  *
  */
  selectTagByPage (params) {
    return services.json(`${schema}/tag/selectTagByPage`, params);
  },
  /**
  * 标签新增接口
  * @param params
  *
  */
  addTag (params) {
    return services.json(`${schema}/tag/addTag`, params);
  },
  /**
  * 标签修改接口
  * @param params
  *
  */
  updateTag (params) {
    return services.json(`${schema}/tag/updateTag`, params);
  },
  /**
  * 标签详情接口
  * @param params
  *
  */
  findTagById (params) {
    return services.get(`${schema}/tag/findTagById`, { params });
  },
  /**
  * 标签删除接口
  * @param params
  *
  */
  deleteTagByID (params) {
    return services.get(`${schema}/tag/deleteTagByID`, { params });
  },


};
