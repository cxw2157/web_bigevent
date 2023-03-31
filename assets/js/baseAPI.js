$.ajaxPrefilter(function (option) {
    // console.log(option);
    option.url = 'http://www.liulongbin.top:3007' + option.url;
})