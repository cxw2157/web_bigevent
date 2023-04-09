const db = require('../db/index.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')


exports.getArtList = (req, res) => {
    if (req.query.cate_id != '' && req.query.state != '') {
        var sql = 'select ev_articles.id ,ev_articles.title ,ev_articles.pub_date ,ev_articles.state ,ev_article_cate.name as cate_name  from ev_articles,ev_article_cate where ev_articles.cate_id=ev_article_cate.id and ev_articles.is_delete=0 and cate_id=? and state=?'
        var reqparams = [req.query.cate_id, req.query.state]
    } else if (req.query.cate_id == '' && req.query.state != '') {
        sql = 'select ev_articles.id ,ev_articles.title ,ev_articles.pub_date ,ev_articles.state ,ev_article_cate.name as cate_name  from ev_articles,ev_article_cate where ev_articles.cate_id=ev_article_cate.id and ev_articles.is_delete=0 and state=?'
        reqparams = [req.query.state]
    } else if (req.query.cate_id != '' && req.query.state == '') {
        sql = 'select ev_articles.id ,ev_articles.title ,ev_articles.pub_date ,ev_articles.state ,ev_article_cate.name as cate_name  from ev_articles,ev_article_cate where ev_articles.cate_id=ev_article_cate.id and  ev_articles.is_delete=0 and cate_id=?'
        reqparams = [req.query.cate_id]
    } else {
        sql = 'select ev_articles.id ,ev_articles.title ,ev_articles.pub_date ,ev_articles.state ,ev_article_cate.name as cate_name  from ev_articles,ev_article_cate where ev_articles.cate_id=ev_article_cate.id and ev_articles.is_delete=0'
        reqparams = []
    }
    // console.log(sql);
    db.query(sql, reqparams, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '文章列表获取成功！',
            data: results,
            total: results.length
        })
    })

}

exports.addArtList = (req, res) => {
    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id,
    }
    const sql = 'insert into ev_articles set ?'
    db.query(sql, articleInfo, (err, results) => {
        // console.log(results);
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('发布文章失败！')
        res.cc('发布文章成功！', 0)
    })
}

exports.deleteArtList = (req, res) => {
    // console.log(req.params);
    var id = req.params.id.substring(1)
    const sql = 'update ev_articles set is_delete=1 where id=?'
    db.query(sql, id, (err, results) => {
        // console.log(results);
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章失败！')
        res.cc('删除文章成功！', 0)
    })
}

exports.getArtListinfo = (req, res) => {
    var id = req.params.id.substring(1)
    const sql = 'select * from ev_articles where id=?'
    db.query(sql, id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 1) return res.cc('获取文章信息失败！')
        // console.log(results);
        res.send({
            "status": 0,
            "message": "获取文章成功！",
            "data": {
                title: results[0].title,
                content: results[0].content,
                cate_id: results[0].cate_id
            }
        })
    })
}

exports.editArtListinfo = (req, res) => {
    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        title: req.body.title,
        cate_id: req.body.cate_id,
        content: req.body.content,
        state: req.body.state,
        pub_date: new Date(),
        // 文章作者的id
        author_id: req.user.id,
    }
    // console.log(articleInfo);
    // console.log(req.body.id);
    const sql = 'update ev_articles set ? where id=?'
    db.query(sql, [articleInfo, req.body.id], (err, results) => {
        // console.log(results);
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新文章失败！')
        res.cc('更新文章成功！', 0)
    })
}