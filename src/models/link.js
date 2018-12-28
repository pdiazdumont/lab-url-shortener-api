import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema({
	shortUrl: String,
	longUrl: String,
	created: Date,
	enabled: {
		type: Boolean,
		default: false
	}
})

mongoose.model('Link', linkSchema)
