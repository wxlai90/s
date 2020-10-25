#!/usr/bin/env node

const express = require('express')
const app = express()

const PORT = process.argv[2] || 5000;


const fileUtils = require('./utils')


app.use(express.static(process.cwd()))


app.get('*', async (req, res, next) => {
    const { path } = req

    if (fileUtils.isPathDirectory(path)) {
        let responseHTML = '<h1>Directories</h1>'

        try {
            const allDirectories = await fileUtils.getAllDirectories(`.${path}`)

            responseHTML += allDirectories
                .map(dir => `<a href="${dir}">${dir}</a></br>`)
                .join('\n')


            responseHTML += '<h1>Files</h1>'

            const allFiles = await fileUtils.getAllFiles(`.${path}`)

            responseHTML += allFiles
                .map(file => `<a href="${file}">${file}</a></br>`)
                .join('\n')
        }
        catch (error) {
            console.error(error)
        }

        res.send(responseHTML)
    }
})


app.listen(PORT, () => console.log(`Listening on ${PORT}`))
