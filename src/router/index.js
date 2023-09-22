import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'cooperatAdmin',
    authCode: 'distribution-channels-cooperation',
    meta: {
      title: '渠道合作管理',
      authCode: 'distribution-channels-cooperation'
    },
    alias: '/cooperatAdmin',
    redirect: '/establish',
    component: () => import('@/views/cooperatAdmin/index'),
    children: [
      {
        path: '/establish',
        name: 'establish',
        meta: {
          title: '建立渠道合作',
          authCode: 'distribution-channels-cooperation-establish'
        },
        component: () => import('@/views/cooperatAdmin/establish/index')
      },
      {
        path: '/establish/lookCustom',
        name: 'lookCustom',
        meta: {
          title: '查看客户',
          authCode: 'distribution-channels-cooperation-establish'
        },
        hidden: true,
        component: () => import('@/views/cooperatAdmin/establish/lookCustom')
      },
      {
        path: '/establish/addEstablish',
        name: 'addEstablish',
        meta: {
          title: '新增渠道合作',
          authCode: 'distribution-channels-cooperation-establish'
        },
        hidden: true,
        component: () => import('@/views/cooperatAdmin/establish/addEstablish')
      },
      {
        path: '/lookEstablish',
        name: 'lookEstablish',
        meta: {
          title: '查看合作申请',
          authCode: 'distribution-channels-cooperation-lookEstablish'
        },
        component: () => import('@/views/cooperatAdmin/lookEstablish/index')
      },
      {
        path: '/agentManagement',
        name: 'agentManagement',
        meta: {
          title: '经纪人管理',
          authCode: 'distribution-channels-cooperation-agentManagement'
        },
        component: () => import('@/views/cooperatAdmin/agentManagement/index')
      },
      {
        path: '/agentManagement/agentManagementDetails',
        name: 'agentManagementDetails',
        meta: {
          title: '详情',
          authCode: 'distribution-channels-cooperation-agentManagement'
        },
        hidden: true,
        component: () => import('@/views/cooperatAdmin/agentManagement/details/index')
      },
      {
        path: '/customerSource',
        name: 'customerSource',
        meta: {
          title: '客户来源设置'
        },
        hidden: true,
        component: () => import('@/views/cooperatAdmin/customerSource/index')
      },
      {
        path: '/customerManagement',
        name: 'customerManagement',
        meta: {
          title: '客户信息管理',
          authCode: 'distribution-channels-cooperation-customerManagement'
        },
        component: () => import('@/views/cooperatAdmin/customerManagement/index')
      },
      {
        path: '/customerManagement/customerDetails',
        name: 'customerDetails',
        meta: {
          title: '详情',
          authCode: 'distribution-channels-cooperation-customerManagement'
        },
        hidden: true,
        component: () => import('@/views/cooperatAdmin/customerManagement/details/index')
      }
    ]
  },
  {
    path: '/report-table/channel-transaction-customer-details',
    name: 'channel-transaction-customer-details',
    meta: { title: '渠道成交客户明细', authCode: 'channel-transaction-customer-details' },
    component: () => import('@/views/ReportTable/ChannelTransactionCustomerDetails.vue')
  }
];

const router = new VueRouter({ routes });
export default router;
