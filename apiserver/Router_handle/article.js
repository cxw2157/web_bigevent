const db = require('../db/index.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.getArticle = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results
        })
    })
}

exports.addArticle = (req, res) => {
    //查询占用情况
    const sql1 = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sql1, [req.body.name, req.body.name.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        //数据写入
        const sql2 = 'insert into ev_article_cate set ?'
        db.query(sql2, [req.body], (err, results) => {
            console.log(results);
            if (err) return res.cc(err)
            if (results.affectedRows != 1) res.cc('新增文章分类失败！')
            res.cc('新增文章分类成功！', 0)
        })
    })
}

exports.deleteArticle = (req, res) => {
    const sql = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(sql, req.params.id.substring(1), (err, results) => {
        if (err) res.cc(err)
        if (results.affectedRows != 1) res.cc('删除文章分类失败!')
        res.cc('删除文章分类成功！', 0)
    })
}

exports.getIdArticle = (req, res) => {
    const sql = 'select * from ev_article_cate where id=?'
    db.query(sql, req.params.id.substring(1), (err, results) => {
        if (err) return res.cc(err)
        // console.log(results);
        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results[0]
        })
    })
}

exports.updatecate = (req, res) => {
    const sql = 'select * from ev_article_cate where id<>? and name=?'
    // console.log(req.body);
    db.query(sql, [req.body.id, req.body.name], (err, results) => {
        // console.log(results);
        if (err) return res.cc(err)
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('名称被占用，请更换后重试！')
        const sql2 = 'update ev_article_cate set ? where Id=?'
        db.query(sql2, [req.body, req.body.id], (err, results) => {
            // console.log(results);
            // 执行 SQL 语句失败
            if (err) return res.cc(err)
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
            // 更新文章分类成功
            res.cc('更新文章分类成功！', 0)
        })
    })
}