$(function () {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能相同';
            }
        },
        rePwd: function (value) {
            if (value != $('[name=newPwd]').val()) {
                return '二次密码不一致';
            }
        }
    });
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status!=0){
                    return layui.layer.msg('原密码错误！');
                }
                layui.layer.msg('更改密码成功！');
                // console.log($('.layui-form'));
                //调用reset()方法使表单重置
                $('.layui-form')[0].reset();
            }
        })
    })
})