const https = require('https')

const args = process.argv.slice(2)
const publishUser = args[0]
const publishBranch = args[1]

const req = https.request({
    hostname: 'qyapi.weixin.qq.com',
    path: '/cgi-bin/webhook/send?key=537f7421-9283-4d21-ae58-aa8f57c01b28',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
}, cb => {
    console.log(cb.statusCode)
})

req.write(JSON.stringify({
    "msgtype": "markdown",
    "markdown": {
        "content": `${publishBranch.includes('test') ? '测试号' : '正式号'}发布\n` +
            `> 发布人: <font color='comment'>${publishUser}</font>\n` +
            `> 发布时间: <font color='comment'>${new Date()}</font>\n` +
            `> 发布分支: <font color='comment'>${publishBranch.split('/')[2]}</font>`
    }
}))
req.end()
