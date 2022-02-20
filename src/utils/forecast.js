const request = require('postman-request')
    // const url = "http://api.weatherstack.com/current?access_key=d0e3ed32ea889f470ee34ff73eaee4f4&query=&units=f"
    // const geocodingURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/miami.json?limit=2&access_token=pk.eyJ1Ijoiam9zaHNhbnoiLCJhIjoiY2t6cG1lMmFhMTYzajJ1bWdzMmlvbWJleCJ9.fnltsKeZ4cW_BsnTC7kekQ&limit=1&query=37.8267,-122.4233"

const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=d0e3ed32ea889f470ee34ff73eaee4f4&query=${latitude},${longitude}&units=f`
    request({ url, json: true }, (error, { body }) => {
        //const { description, temperature, prob_rain }
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback(`Unable to find location. Try with another search.  \nError: ${body.error.info} ${body.error.code}`, undefined)
        } else {
            const { temperature, precip, feelslike, humidity, weather_descriptions } = body.current
            let description = weather_descriptions[0]


            callback(null, `It is ${description} throghtout. It is currently ${temperature} degrees. It feels like ${feelslike} degrees out. Humidity is ${humidity}%. There is a ${precip}% chance of rain`)
        }
    })
}

module.exports = forecast