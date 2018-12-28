const randomString = (len, charSet) => {
	charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	let randomString = ''

    for (let i = 0; i < len; i++) {
        let randomPosition = Math.floor(Math.random() * charSet.length)
        randomString += charSet.substring(randomPosition,randomPosition + 1)
	}

    return randomString;
}

export default {
	randomString
}
