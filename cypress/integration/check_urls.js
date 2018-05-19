const baseUrl = 'https://www-uat.liferay.com'

const locales = [
	'',
	'/de',
	'/en',
	'/en_US',
	'/en_AU',
	'/es',
	'/fr',
	'/it',
	'/ja',
	'/pt',
	'/zh',
]

import urls from '../fixtures/redirects.json'

var request = function(url) {
	cy
		.request({
			url: url,
			followRedirect: false,
		})
		.then(response => {
			requestCount++
			curRequestUrl = response.redirectedToUrl || url

			if (response.status == '301' || response.status == '302') {
				request(response.redirectedToUrl)
			} else {
				results[ogRequestUrl] = {
					endUrl: curRequestUrl,
					requestCount: requestCount,
					responseStatus: response.status,
				}

				if (!results[response.status]) {
					results[response.status] = []
				}

				results[response.status].push(ogRequestUrl)
			}
		})
}

var requestCount = 0
var curRequestUrl = ''
var ogRequestUrl = ''
var results = {}

var initRequest = function(url) {
	it('Request ' + url, function() {
		requestCount = 0
		curRequestUrl = ''

		request(url)
	})
}

urls.forEach(function(url) {
	describe('Check ' + url, function() {
		if (url.startsWith('http')) {
			ogRequestUrl = url

			initRequest(url)

			return
		}

		locales.forEach(function(locale) {
			let localizedUrl = baseUrl + locale + url

			ogRequestUrl = localizedUrl

			initRequest(localizedUrl)
		})
	})
})

console.log(results)
