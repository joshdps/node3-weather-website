const request = require('postman-request')
    // const url = "http://api.weatherstack.com/current?access_key=d0e3ed32ea889f470ee34ff73eaee4f4&query=&units=f"
    // const geocodingURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/miami.json?limit=2&access_token=pk.eyJ1Ijoiam9zaHNhbnoiLCJhIjoiY2t6cG1lMmFhMTYzajJ1bWdzMmlvbWJleCJ9.fnltsKeZ4cW_BsnTC7kekQ&limit=1&query=37.8267,-122.4233"

const geocode = (address, callback) => {
    address = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=2&access_token=pk.eyJ1Ijoiam9zaHNhbnoiLCJhIjoiY2t6cG1lMmFhMTYzajJ1bWdzMmlvbWJleCJ9.fnltsKeZ4cW_BsnTC7kekQ&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(null, 'Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback(null, 'Unable to find location. Try with another search!')
        } else {

            callback(null, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode