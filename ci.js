const config = require('./utils/config')

const ci = require('miniprogram-ci')

const project = new ci.Project({
    appid: config.appId,
    type: 'miniProgram',
    projectPath: './',
    privateKeyPath: './ci-private.key',
    ignores: ['./node_modules/**/*'],
})

async function upload() {
    await ci.upload({
        project,
        version: config.version,
        desc: '',
        setting: {
            es6: true,
            es7: true,
            minify: true,
            autoPrefixWXSS: true
        },
        onProgressUpdate: console.log,
    })
}

upload()
