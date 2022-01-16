const express = require('express')
const cors = require('cors')
const volleyball = require('volleyball')
const fs = require('fs')
const auth = require('./auth/signUser')
const middleware = require('./auth/middleware')

const app = express()
app.use(express.json())
app.use(cors())
app.use(volleyball)

app.get('/', (req, res) => {
    res.json({
        message: "welcome"
    })
})

app.use('/auth', auth)

app.post('/', middleware.verifyToken, (req, res) => {
    fs.readFile('MOCK_DATA.json', (err, data) => {
        if (err) res.json('went wrong')
        let read_data = JSON.parse(data)
        let response_data = [];
        read_data.map(each => {
            if ((each.latitude <= (req.body.latitude + 0.02)) &&  (each.latitude >= (req.body.latitude - 0.02))) {
                if ((each.longitude <= (req.body.longitude + 0.02)) &&  (each.longitude >= (req.body.longitude - 0.02))) {
                    response_data.push(each)
                }
            }
        })
    res.json(response_data)
    })
})

app.listen(5000, () => {
    console.log('running server')
})