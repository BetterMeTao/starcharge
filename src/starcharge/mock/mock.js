/**
 * @ author kunnisser
 * @ date 2018/3/14
 * @ description: 设置mock数据接口
*/

import Axios from 'axios'
import {MOCK_PATH} from '../utils/dispatchEnv'

const TIMEOUT = 14e3;

const getMock = (url) => {
  return (params) => Axios.get(url, {
    params,
    timeout: TIMEOUT
  })
};

const postMock = (url) => {
  return (params) => Axios.post(url, params, {
    timeout: TIMEOUT,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
};

const deleteMock = (url) => {
  return (id, params) => Axios.delete(url + '/' + id, {
    params: params,
    timeout: TIMEOUT
  })
};

const putMock = (url) => {
  return params => Axios.put(url, params)
};

const patchMock = (url) => {
  return (id, params) => Axios.patch(url + '/' + id, params, {
    timeout: TIMEOUT
  })
};

const getChargeRank = getMock(MOCK_PATH + '/stubGroup/compatibleCarList');
const getInvoiceInfo = getMock(MOCK_PATH + '/invoice/fillInvoiceInfoNew');
const getUserAddress = getMock(MOCK_PATH + '/invoice/userAddressDetail');
const subInvoiceOrder = postMock(MOCK_PATH + '/invoice/generateInvoiceOrderAndBillApply');
const getBillInfo = getMock(MOCK_PATH + '/invoice/billInfo');
const getCoupons = postMock(MOCK_PATH + '/voucher/list/qry');
const getUserInfo = postMock(MOCK_PATH + '/activityInfo/get');
export {
  getChargeRank,
  getInvoiceInfo,
  getUserAddress,
  subInvoiceOrder,
  getBillInfo,
  getCoupons,
  getUserInfo
}
