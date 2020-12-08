#!/usr/bin/env node
const path = require('path')
const express = require('express');
const morgan = require('morgan');
const app = express()
const cookieParser = require('cookie-parser')
const fileUtils = require('./utils')
const checkAuth = require('./middleware/checkAuth')


let PORT = 5000;
let PASSWORD

const args = process.argv.slice(2)

args.forEach((arg, index) => {
    if (arg === '--port') {
        PORT = args[index + 1]
    }

    if (arg === '--password') {
        if (args[index + 1] && args[index + 1] !== '--port') {
            PASSWORD = args[index + 1]
        } else {
            PASSWORD = Math.random().toString().substr(2, 6)
        }
    }
})


app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(cookieParser())
app.use(express.static(process.cwd()))
app.use(checkAuth(PASSWORD))


app.use(async (req, res, _) => {
    const { path } = req

    if (fileUtils.isPathDirectory(path)) {
        try {
            const allDirectories = await fileUtils.getAllDirectories(`.${path}`)
            const allFiles = await fileUtils.getAllFiles(`.${path}`)

            res.render('index', {
                allDirectories,
                allFiles
            })
        }
        catch (error) {
            console.error(error)
            res.render('error', { error })
        }
    }
})


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
    if (PASSWORD) {
        console.log(`Password: ${PASSWORD}`)
    }
})
