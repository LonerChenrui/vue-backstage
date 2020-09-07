import Axios from './request'

// 获取echarts图表数据
export function getEchartsData() {
  return Axios.request({
    url: 'reports/type/1',
    method: 'get',
  })
}