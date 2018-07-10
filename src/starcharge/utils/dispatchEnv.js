/*
*  开发与发布环境配置
*  @params dev {Boolean} 判别环境
*  @params BASE_PATH {String} 发布环境静态资源根路径
*  @params API_PATH {String} 发布环境接口根路径
*  @params ASSET_PATH {String} Code Context中的资源根路径
*  @params MOCK_PATH {String} Code Context中的接口根路径
* */

const proConfig = require('../../../config')

const prostatus = process.env.NODE_ENV
const DEV = prostatus === 'development'
const [BASE_PATH, API_PATH, DEV_API_PATH] = [proConfig.basePath, proConfig.api, proConfig.devApi]
const ASSET_PATH = DEV ? '' : BASE_PATH
const MOCK_PATH = DEV ? '/api' : API_PATH

export {
  ASSET_PATH,
  MOCK_PATH,
  DEV
}
