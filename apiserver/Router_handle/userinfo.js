const db = require('../db/index.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.getuserinfo = (req, res) => {
    const sql = 'select id, username, nickname, email, user_pic from ev_user where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 1) return res.cc('用户信息查询失败!')
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results[0]
        })
    })
}

exports.updateuserinfo = (req, res) => {
    const sql = 'update ev_user set ? where id=?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows != 1) return res.cc('修改用户基本信息失败!')
        res.cc('修改用户基本信息成功！', 0)
    })
}

exports.updatepwd = (req, res) => {
    const sql1 = 'select * from ev_user where id=?'
    db.query(sql1, [req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 1) return res.cc('用户不存在!')

        // // 密码加密
        // const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        // if (!compareResult) return res.cc('原密码错误!')
        // 密码不加密
        if (req.body.oldPwd!=results[0].password) return res.cc('原密码错误!')

        if (req.body.oldPwd == req.body.newPwd) return res.cc('新密码不能和旧密码相同!')
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        const sql2 = 'update ev_user set password=? where id=?'
        db.query(sql2, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows != 1) return res.cc('修改用户基本信息失败!')
            res.cc('修改用户基本信息成功！', 0)
        })
    })

}

exports.updateavatar = (req, res) => {
    //判断图像是否合格
    //省略
    // console.log(req.body);
    //更新图像
    const sql = 'update ev_user set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows != 1) return res.cc('更新头像失败!')
        res.cc('更新头像成功', 0)
    })
}