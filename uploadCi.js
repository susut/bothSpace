const config = require('./utils/config')

const uploadCi = require('miniprogram-ci')

// 从命令行获取privateKey path
const args = process.argv.slice(2)
const privateKeyPath = args[0] && args[0].split('=')[1]
console.log(privateKeyPath)
if (!privateKeyPath) process.exit(1)

const project = new uploadCi.Project({
    appid: config.appId,
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
