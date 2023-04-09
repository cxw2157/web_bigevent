$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var q = {
        pagenum: 1,// 页码值  De 1
        pagesize: 2,// 每页显示多少条数据
        cate_id: '',// 文章分类的 Id
        state: ''//文章的状态
    };


    // <!-- 初始化表单页面 -->
    initTable();
    function initTable() {
        // console.log(q);
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg('获取文章类别失败！');
                }
                var htmlstr = template('tpl-cate', res);
                $('#artlistbody').html(htmlstr);
                //表单动态渲染
                // form.render()
                //调用分页
                renderPage(res.total);
            }
        })
    }

    initCate();
    //下拉表单
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
                //表单动态渲染
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
        // console.log(q);
        initTable();
    });

    $('body').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function () {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/:' + id,
                success: function (res) {
                    if (res.status != 0) return layer.msg('文章删除失败!')
                    layer.msg('文章删除成功!')
                    initTable();
                }
            })
        })
    })

    var updateartListindex = null;
    $('body').on('click', '#btnEdit', function () {
        updateartListindex = layer.open({
            type: 1,
            title: '文章信息修改',
            area: ['1000px', '450px'],
            content: $('#artList').html()
        });
        initCate()
        var id = $(this).attr('data-id');
        $('#btnupdate').attr('data-id', id);
        $('#btnSave2').attr('data-id', id);
        $.ajax({
            method: 'GET',
            url: '/my/article/:' + id,
            success: function (res) {
                console.log(res);
                form.val('form-edit', res.data);
            }
        })
    })


     // ^ 定义文章的发布状态
    let art_state = '已发布'
    // ^ 为存为草稿按钮，绑定点击事件处理函数
    $('body').on('click','#btnSave2', function () {
        art_state = '草稿'
    })
    // ^ 为表单绑定 submit 提交事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        // & 1 基于当前表单快速创建一个 FormData 对象
        var id = $('#btnupdate').attr('data-id')
        // console.log(id);
        let fd = new FormData($(this)[0])
        // & 2 将文章的发布状态，存到fd中
        fd.append('state', art_state)
        // console.log(fd.get('state'));
        fd.append('id', id)
        $.ajax({
            method: 'POST',
            url: '/my/article/edit',
            data: fd,
            //& 注意：如果向服务器提交的是 FormData 格式的数据，必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新文章失败！')
                }
                if(art_state == '草稿'){
                    layer.msg('文章已存为草稿！')
                }else{
                    layer.msg('文章信息更新成功！')
                }
                layer.close(updateartListindex);
                initTable()
                art_state = '已发布'
            }
        })

    })


    //定义渲染分页的方法
    function renderPage(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
                , count: total //数据总数，从服务端得到
                , limit: q.pagesize //每页显示数据
                , limits: [2, 3, 5, 10] //条目数
                , curr: q.pagenum //当前显示页数
                , layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
                , jump: function (obj, first) {
                    // console.log(obj);
                    //把最新的页码值重新赋值给q.pagenum
                    q.pagenum = obj.curr;
                    //把最新的条目数重新赋值给q.pagesize
                    q.pagesize = obj.limit;

                    if (!first) {
                        initTable();
                    }
                }
            });
        });
    }

})


