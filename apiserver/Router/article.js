const express=require('express')
const router=express.Router()

//导入路由处理函数模块
const articleHandle = require('../Router_handle/article.js')
//获取文章分类列表接口
router.get('/cates',articleHandle.getArticle)
// 新增文章分类接口
router.post('/addcates',articleHandle.addArticle)
// 根据 Id 删除文章分类接口
router.get('/deletecate/:id',articleHandle.deleteArticle)
// 根据 Id 获取文章分类数据接口
router.get('/cates/:id',articleHandle.getIdArticle)
// 根据 Id 更新文章分类数据接口/updatecate
router.post('/updatecate',articleHandle.updatecate)



//模块导出
module.exports=router