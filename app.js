const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');


const app = express()


app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded());
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/products', require('./routes/products.routes'))
app.use('/api/profile', require('./routes/profile.routes'))
app.use('/api/admin', require('./routes/admin.routes'))
app.use('/storage', express.static(path.join(__dirname, 'static')))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error: ', e.message)
        process.exit(1)
    }
}

start()

