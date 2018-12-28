# URL Shortener API

Sample Node.js application.

## Usage
This API offers 2 endpoints, one to shorten a url and another to get the information from a short url.

### Shorten a url
```sh
POST /make,
BODY (url encoded) "url" = "https://www.google.com"
```
Response:
```json
{
	"shortUrL": "SaPkiIO",
	"longUrl": "https://www.google.com"
}
```

### Get a short url
```sh
GET /get/:shortUrl
```
Example: GET /get/SaPkiIO. Response:
```json
{
	"shortUrL": "SaPkiIO",
	"longUrl": "https://www.google.com"
}
```

## To Do
- Setup configuration via files for different environments
- Remove hardcoded values
