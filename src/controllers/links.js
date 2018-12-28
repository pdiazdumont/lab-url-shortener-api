import mongoose from 'mongoose'
import logger from '../services/logger'
import stringUtils from '../utils/string'

const make = async (request, response) => {
	const longUrl = request.body && request.body.url

	if (!longUrl || longUrl === '') {
		response.status(400).send('A url is required')
		return
	}

	const link = mongoose.model('Link')

	let shortUrl
	let numberOfAttempts = 0

	while (!shortUrl) {
		numberOfAttempts++;

		let candidate = stringUtils.randomString(7)

		if (await link.findOne({ shortUrl: candidate }) === null) {
			shortUrl = candidate
		}

	}

	let newLink = new link({
		shortUrl,
		longUrl
	})

	try {
		await newLink.save()
		logger.info(`Link '${longUrl}' (${shortUrl}) created after ${numberOfAttempts} attempt(s)`)
	}
	catch (e) {
		logger.error(`Could not create link '${longUrl}'. ${e}`)
		response.status(500).send('An error has occurred. Please try again')
		return
	}

	response.json({
		longUrl,
		shortUrl
	})
}

const get = async (request, response) => {
	const shortUrl = request.params.shortUrl

	if (!shortUrl || shortUrl === '') {
		logger.warn(`The short url is required`)
		response.status(404).send('Sorry, the requested link does not exist :C')
		return
	}

	const link = mongoose.model('Link')
	const requestedLink = await link.findOne({ shortUrl })

	if (requestedLink == null) {
		logger.warn(`Link '${shortUrl}' was not found`)
		response.status(404).send('Sorry, the requested link does not exist :C')
		return
	}

	response.json({
		shortUrl: requestedLink.shortUrl,
		longUrl: requestedLink.longUrl
	})
}

export default {
	get,
	make
}
