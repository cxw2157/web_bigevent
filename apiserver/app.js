//模块导入
const express = require('express')                //创建服务器
const cors = require('cors')                      //解决跨域
const expressjwt = require('express-jwt')         //生存JWT 的 Token 字符串

//创建服务器实例
const app = express()

//挂载中间件函数---res.cc()  作用：简化返回数据的代码编写
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

//Token字符串的解码
const secret = require('./Router_handle/user.js')
app.use(expressjwt({ secret: secret.secretKey }).unless({ path: [/\/api\//] }))

//解决跨域
app.use(cors())
//解析application/x-www-form-urlencoded 格式表单数据
app.use(express.urlencoded({ extended: false }))

//引入登录注册路由
const userrouter = require('./Router/user.js')
app.use('/api', userrouter)

//引入用户信息路由
const userinforouter=require('./Router/userinfo.js')
app.use('/my',userinforouter)

//引入文章类别管理路由
const articlerouter=require('./Router/article.js')
app.use('/my/article',articlerouter)

//引入文章管理路由
const artrouter=require('./Router/art.js')
app.use('/my/article',artrouter)

//挂载中间件函数------判断错误信息
app.use((err, req, res, next) => {
    if (err.name == 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc(err.message)
})


//开启服务器
app.listen(3007, () => {
    console.log('apiserver Running at 127.0.0.1:3007');
})