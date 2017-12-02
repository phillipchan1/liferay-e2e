'use strict'

const express = require('express')
const parser = require('body-parser')
const cmd = require('node-cmd')

cmd.get('npx cypress run', function(err, data) {
	if (err) {
		console.log('error:')
		console.log(err)
	}
	console.log('the current dir contains these files :\n\n', data)
	process.exit()
})

const app = express()

// get method for parsing body
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))

app.use('/', express.static('client/'))

// direct all other routes to client-side app
app.all('/*', function(request, response) {
	response
		.status(200)
		.set({ 'content-type': 'text/html; charset=utf-8' })
		.sendFile(process.cwd() + '/client/index.html')
})

const port = process.env.PORT || 80

app.listen(port, error => {
	const boldBlue = text => `\u001b[1m\u001b[34m${text}\u001b[39m\u001b[22m`

	if (error) {
		console.error(error)
	} else {
		console.info(`Server is running at port ${boldBlue(port)}`)
	}
})
