$.ajaxPrefilter(function (option) {
    // console.log(option);
    // option.url = 'http://www.liulongbin.top:3007' + option.url;
    option.url = 'http://127.0.0.1:3007' + option.url;

    if (option.url.indexOf('/my/') != (-1)) {
        // console.log(option.url.indexOf('/my/'));
        option.headers = { Authorization: localStorage.getItem('token') || '' };
    };

    option.complete = function (res) {
        // console.log(res);
        if(res.readyState==0){
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = 'login.html'
        }
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = 'login.html'
        }
    };
});