$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度不能超过6位';
            }
        }
    });
    initUserInfo();
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        updateUserInfo();
        //调用父页面的方法更新用户头像和昵称
        window.parent.getUserInfo();
    });
    $('#btnreset').on('click',function(e){
        e.preventDefault();
        initUserInfo();
    });


    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取用户信息失败！');
                }
                form.val('formUserInfo', res.data);
            }
        })
    }

    function updateUserInfo() {
        console.log($('.layui-form').serialize());
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $('.layui-form').serialize(),
            // data: {name:'测试555',alias:'test555'},
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('信息更新成功！');
            }
        })
    }
})