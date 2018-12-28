import logger from './services/logger'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose' 
import linksController from './controllers/links'

const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
	mongoose.set('debug', true)
}

mongoose.connect('mongodb://localhost:27017/url-shortener', { useNewUrlParser: true })

mongoose.connection
	.on('error', error => {
		logger.error(`Could not connect to database server. Error: ${error}`)
	})
	.once('open', () => {
		logger.info('Connection to database has been established')
		app.emit('ready')
	})

import './models/link'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()
router.post('/make', linksController.make)
router.get('/get/:shortUrl', linksController.get)

app.use(router)

app.on('ready', () => {
	app.listen(3000, () => {
		logger.info('Server started')
	})
})
