import service from '@/utils/services';

const schema = '/daily-show-report';

function querySummary(url, action, pageNum, pageSize, filter) {
  const [startDate, endDate] = filter.date || [];

  return service.get(schema + url, {
    action,
    params: { ...filter, pageNum, pageSize, startDate, endDate, date: undefined }
  })
}

export const queryChannelCustomerSummary = querySummary.bind(null, '/channel/customer/summary', '查询渠道客户明细');
export const queryChannelDealSummary = querySummary.bind(null, '/channel/deal/summary', '查询渠道成交客户明细');

// ========================================================================
async function getOptions(url, action, params) {
  const { data } = await service.get(schema + url, {
    action: `获取${action}选项列表`,
    params
  });

  return data.map(v => ({ value: v.id, label: v.name }));
}

export function getBrokerStoreOptions(orgId) {
  if (!orgId) {
    return [];
  }

  return getOptions('/option/broker/store', '经纪人门店', { orgId });
}

export function getBrokerCompanyOptions() {
  return getOptions('/option/broker/company', '经纪人公司');
}

export function getStatusOptions() {
  return getOptions('/option/status', '客户状态');
}
