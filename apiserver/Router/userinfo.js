const express=require('express')
const router=express.Router()

//导入路由处理函数模块
const userinfoHandle = require('../Router_handle/userinfo.js')
//用户基本信息接口
router.get('/userinfo',userinfoHandle.getuserinfo)
//更新用户基本信息接口
router.post('/userinfo',userinfoHandle.updateuserinfo)
//重置密码接口
router.post('/updatepwd',userinfoHandle.updatepwd)
//更新头像接口
router.post('/update/avatar',userinfoHandle.updateavatar)


//模块导出
module.exports=router