const express = require('express')


//创建路由
const router = express.Router()
//导入路由处理函数模块
const userHandle = require('../Router_handle/user.js')

//用户注册接口
router.post('/reguser', userHandle.reguser)


//用户登录接口
router.post('/login', userHandle.login)

//模块导出
module.exports = router