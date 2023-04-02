$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    };

    initTable();

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('获取文列表失败！');
                }
                var htmlstr = template('tpl-table', res);
                //后台没有内容，渲染无效
                // $('#artlistbody').html(htmlstr);

                //调用分页
                renderPage(res.total);
            }
        })
    }

    initCate();
    //初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取分类数据失败！');
                }
                var htmlstr = template('tpl-table', res);
                // console.log(htmlstr);
                $('[name=cate_id]').html(htmlstr);
                //重新渲染
                form.render();
            }
        });
    };

    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    });

    //定义渲染分页的方法
    function renderPage(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
                , count: total //数据总数，从服务端得到
                , limit: q.pagesize //每页显示数据
                , limits: [2,3,5,10] //条目数
                , curr: q.pagenum //当前显示页数
                , layout: ['count','limit','prev','page','next','skip']
                , jump: function (obj,first) {
                    //把最新的页码值重新赋值给q.pagenum
                    q.pagenum = obj.curr;
                    //把最新的条目数重新赋值给q.pagesize
                    q.pagesize=obj.limit;

                    if(!first){
                        initTable();
                    }
                }
            });
        });
    }
})