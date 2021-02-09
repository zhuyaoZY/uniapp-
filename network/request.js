const BASR_URL = 'http://musicapi.leanapp.cn'
const BASR_URL2 = 'https://music.163.com'
export const myRequest1 = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASR_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if (res.statusCode !== 200) {
					return uni.showToast({
						title: '获取数据失败'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败'
				})
				reject(err)
			}
		})
	})
}
export const myRequest2 = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASR_URL2 + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if (res.statusCode !==200) {
					return uni.showToast({
						title: '获取数据失败'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败'
				})
				reject(err)
			}
		})
	})
}
