$(function () {
    getUserInfo();

    var layer = layui.layer;
    $('#exit').on('click', function () {
        layer.confirm('确定退出登录吗?', { icon: 3, title: '退出提示' }, function (index) {
            console.log(index);
            localStorage.removeItem('token');
            location.href = 'login.html';
            layer.close(index);
        });
    })
});

//获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',

        success: function (res) {
            if (res.status != 0) {
                return layer.msg('获取用户信息失败');
            }
            renderAvatar(res.data);
            // console.log(res);
        },
        //全局统一挂载complete
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href='login.html';
        //     }
        // }
    });
};

//欢迎用户和文字头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    console.log(user);
    $('#welcome').html('欢迎' + name);
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avater').hide();
        $('#image').attr('src',user.user_pic).show();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avater').html(first).show();
    }
}