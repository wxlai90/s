const fs = require('fs')
const fileUtils = require('../utils')


describe('file utils', () => {

    it('#isPathDirectory() should return true when path is "/"', () => {
        const result = fileUtils.isPathDirectory('/')
        expect(result).toEqual(true)
    })


    it('#getAllDirectories() should return a promise that resolves to an array of directories only', async () => {
        fs.readdir = jest.fn((_, __, callback) => callback(null, [
            {
                name: 'is Directory',
                isDirectory: () => true,
            },
            {
                name: 'is Not Directory',
                isDirectory: () => false,
            }
        ]))

        const allDirectories = await fileUtils.getAllDirectories('/mockPath')
        expect(allDirectories).toEqual(['is Directory'])
    })


    it('#getAllDirectories() should return a promise that resolves to an array of files only', async () => {
        fs.readdir = jest.fn((_, __, callback) => callback(null, [
            {
                name: 'is Directory',
                isFile: () => false,
            },
            {
                name: 'is File',
                isFile: () => true,
            }
        ]))

        const allFiles = await fileUtils.getAllFiles('/mockPath')
        expect(allFiles).toEqual(['is File'])
    })
})