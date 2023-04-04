const config = require('./utils/config.js')
const projectConfig = require('./project.config.json')

const uploadCi = require('miniprogram-ci')

// 从命令行获取privateKey path
const args = process.argv.slice(2)
const privateKeyPath = args[0] && args[0].split('=')[1]
console.log(privateKeyPath)
if (!privateKeyPath) process.exit(1)

const project = new uploadCi.Project({
    appid: projectConfig.appid,
    type: 'miniProgram',
    projectPath: './',
    privateKeyPath,
    ignores: ['./node_modules/**/*'],
})

// 上传代码
async function upload() {
    await uploadCi.upload({
        project,
        version: config.version,
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
