const path = require('path')
const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Josh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'Josh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This es a help message page',
        title: 'Help',
        name: 'Josh'
    })
})

app.get('/help/*', (req, res) => {
    res.render('helpNotFound', {
        message: 'Help article not found',
        title: 'helpNotFound',
        name: 'Josh'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else {

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

            if (error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                return res.send({
                    address: req.query.address,
                    location: location,
                    forecast: forecastData

                })
            })
        })
    }

})

app.get('/products', (req, res) => {

    if (!req.query.key) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: 'Help',
        name: 'Josh'
    })
})

app.listen(port, () => {
    console.log(`Server is running up at port ${port}.`)
})