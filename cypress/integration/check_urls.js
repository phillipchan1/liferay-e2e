const baseUrl = 'https://www-uat.liferay.com'

const locales = [
	'',
	// '/de',
	// '/en',
	// '/en_US',
	// '/en_AU',
	// '/es',
	// '/fr',
	// '/it',
	// '/ja',
	// '/pt',
	// '/zh',
]

import urls from '../fixtures/redirects.json'

var results = { urls: [] }

var request = function(url, ogRequestUrl, requestCount) {
	cy
		.request({
			url: url,
			followRedirect: false,
		})
		.then(response => {
			var curRequestUrl = response.redirectedToUrl || url
			requestCount++

			if (!results[response.status]) {
				results[response.status] = []
			}

			results[response.status].push(url)

			if (response.status == '301' || response.status == '302') {
				request(response.redirectedToUrl, ogRequestUrl, requestCount)
			} else {
				results['urls'].push({
					startUrl: ogRequestUrl,
					endUrl: curRequestUrl,
					requestCount: requestCount,
					responseStatus: response.status,
				})
			}
		})
}

var initRequest = function(url) {
	var ogRequestUrl = url
	var requestCount = 0

	it('Request ' + url, function() {
		request(url, ogRequestUrl, requestCount)
	})
}

urls.forEach(function(url) {
	describe('Check ' + url, function() {
		if (url.startsWith('http')) {
			initRequest(url)

			return
		}

		locales.forEach(function(locale) {
			let localizedUrl = baseUrl + locale + url

			initRequest(localizedUrl)
		})
	})
})

console.log(results)
