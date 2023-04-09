const express = require('express')
const router = express.Router()


// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })    //B:\VSCode\WEB\Ajax\大事记\apiserver\uploads



//导入路由处理函数模块
const artHandle = require('../Router_handle/art.js')
//获取文章分类列表接口
router.get('/list', artHandle.getArtList)
//
router.post('/add', upload.single('cover_img'), artHandle.addArtList)

router.get('/delete/:id',  artHandle.deleteArtList)

router.get('/:id',  artHandle.getArtListinfo)

router.post('/edit', upload.single('cover_img'), artHandle.editArtListinfo)

//模块导出
module.exports = router