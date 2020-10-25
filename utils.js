const fs = require('fs')


const getAllDirectories = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, { withFileTypes: true }, (err, dirContents) => {
            if (err) {
                reject(err)
            }

            const onlyDirectories = dirContents
                .filter(d => d.isDirectory())
                .map(d => d.name)

            resolve(onlyDirectories)
        })
    })
}


const getAllFiles = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, { withFileTypes: true }, (err, dirContents) => {
            if (err) {
                reject(err)
            }

            const onlyFiles = dirContents
                .filter(d => d.isFile())
                .map(d => d.name)

            resolve(onlyFiles)
        })
    })
}


const isPathDirectory = (path) => {
    if (path === '/') return true

    if (path === '/favicon.ico') return false

    path = path.substr(1)
    return fs.lstatSync(path).isDirectory()
}


module.exports = {
    getAllDirectories,
    getAllFiles,
    isPathDirectory
}