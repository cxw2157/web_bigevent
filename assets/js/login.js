$(function () {
    $('#loginbtn').on('click', function () {
        // e.preventDefault();
        $('#loginbtn').hide();
        $('#regibtn').show();
        $('.form-regi').hide();
        $('.form-login').show();
        $('.form-login').css('animation-name', 'show');
        $('.form-regi').css('animation-name', 'hide');
    });
    $('#regibtn').on('click', function (e) {
        // e.preventDefault();
        $('#loginbtn').show();
        $('#regibtn').hide();
        $('.form-regi').show();
        $('.form-login').hide();
        $('.form-regi').css('animation-name', 'show');
        $('.form-login').css('animation-name', 'hide');
    })

    //1. form表单的onsubmit事件中加入e.preventDefault()
    //2. form标签中添加onsubmit= "return false"属性
    var form = layui.form;
    var layer = layui.layer;
    $('.form-login').on('submit', function (e) {
        e.preventDefault();
        console.log($('.form-login').serialize());
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$('.form-login').serialize(),
            success:function(res){
                if(res.status!=0){
                    return layer.msg('用户名不存在或者密码错误！');
                }
                layer.msg('登录成功！');
                localStorage.setItem('token',res.token);
                location.href='index.html';
            }
        });
    });

    $('.form-regi').on('submit', function (e) {
        e.preventDefault();
        var data = { username: $('.user-input-regi').val(), password: $('.pwd-input-regi').val() }
        $.post('/api/reguser', data, function (res) {
            // console.log(res);
            if(res.status!=0){
                return layer.msg('用户名被占用，请更换其他用户名！');
            }
            layer.msg('注册成功！');
            $('#loginbtn').click();
        });
    })

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value, item) { //value：表单的值、item：表单的DOM对象
            var pwd = $('.pwd-input-regi').val();
            if (pwd != value) {
                return '二次输入的密码不一致';
            }
        }
    })
})