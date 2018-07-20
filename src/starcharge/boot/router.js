import App from '../app'
import ChargeCarRank from '../pages/chargeCarRank';
import ApplyInvoice from '../pages/applyInvoice';
import InvoiceInfo from '../pages/invoiceInfo';
import NoFound from '../pages/notFound';
import TimeLine from '../pages/activity/timeline/timeline';
import FullPageSlide from '../pages/activity/timeline/full-page-slide';
import Coupons from '../pages/activity/timeline/coupons'
const proPath = [
  {
    // 一级路由配置
    path: '/',
    component: TimeLine,
    // 相关子路由配置
    children: [
      // 二级路由为空重定向到指定页
      {
        path: '/',
        name: 'full-page-slide',
        component: FullPageSlide
      },
      {
        path: '/coupons',
        name: 'coupons',
        component: Coupons
      },
      {
        path: '',
        redirect: '/applyInvoice'
      },
      // 定义充电排行路由
      {
        path: '/chargeCarRank',
        component: ChargeCarRank
      },
      {
        path: '/applyInvoice',
        component: ApplyInvoice
      },
      {
        path: '/invoiceInfo',
        component: InvoiceInfo
      }
    ]
  },
  // 无匹配路由重定向到404
  {
    path: '*',
    component: NoFound
  }
]

export default proPath
