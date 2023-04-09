const db = require('../db/index.js')
//密码加密和密码比对
const bcrypt = require('bcryptjs')
//生存Token字符串
const jwt=require('jsonwebtoken')

// 创建密钥
const secretKey = 'cxw ^_^'
//导出密钥给app.js供其解析
exports.secretKey=secretKey

//导出用户注册处理函数
exports.reguser = (req, res) => {
    const userinfo = req.body
    console.log(userinfo);
    if (!userinfo.username || !userinfo.password) return res.cc('用户名或密码不能为空!')

    //定义用户名和密码规则
    // console.log(userinfo.username.length)
    // console.log(userinfo.username.length)
    if (userinfo.password.length < 6 || userinfo.password.length > 12) {
        return res.cc('密码只能在6位和12位之间!')
    }

    const sql = 'select * from ev_user where username=?'
    db.query(sql, userinfo.username, (err, results) => {
        // if (err) return res.send({ status: 1, message: err.message })
        if (err) return res.cc(err)
        if (results.length > 0) {
            // return res.send({ status: 1, message: '该用户已存在!' })
            return res.cc('该用户已存在!')
        }
        //在当前项目中，使用 bcryptjs 对用户密码进行加密，优点：
        //1.加密之后的密码，无法被逆向破解
        //2.同一明文密码多次加密，得到的加密结果各不相同，保证了安全性
        //3.加密数据后的数表示加密强度

        //密码暂时不加密，开发完成再加密
        // userinfo.password = bcrypt.hashSync(userinfo.password, 10)


        const insertsql = 'insert into ev_user set ?'
        db.query(insertsql, { username: userinfo.username, password: userinfo.password }, (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows != 1) return res.cc('注册失败!')
            // res.send({ status: 0, message: '注册成功'})
            res.cc('注册成功!', 0)
        })
    })
}

//导出用户登录处理函数
exports.login = (req, res) => {
    const userinfo = req.body
    // console.log(userinfo);
    if (!userinfo.username || !userinfo.password) return res.cc('用户名或密码不能为空!')

    //定义用户名和密码规则
    if (userinfo.password.length < 6 || userinfo.password.length > 12) {
        return res.cc('密码只能在6位和12位之间!')
    }

    const sql = 'select * from ev_user where username=?'
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 1) {
            return res.cc('用户不存在!')
        }
        // console.log(results);
        // console.log(results[0].password);
        //密码相同对比的结果为true
        // const comparepwd=bcrypt.compareSync(userinfo.password,results[0].password)
        // if (!comparepwd) {
        //     return res.cc('密码错误!')
        // }

        
        if (userinfo.password!=results[0].password) {
            return res.cc('密码错误!')
        }

        const user={...results[0],password:'',user_pic:''}
        // console.log(user);
        
        const tokenstr = jwt.sign(user, secretKey, { expiresIn: '10h' })
        // console.log(tokenstr);
        return res.send({
            status:0,
            msg:'登录成功',
            token:'Bearer '+tokenstr
        })
    })
}