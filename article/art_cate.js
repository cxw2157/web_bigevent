$(function () {
    initArtCateList();
    var layer = layui.layer;
    var form = layui.form;
    var layerindex = null;
    var updatelayerindex = null;
    $('#artbtn').on('click', function () {
        layer.msg('该功能开发尚未完善！');
        // layerindex = layer.open({
        //     type: 1,
        //     title: '添加文章分类',
        //     area: ['500px', '300px'],
        //     content: $('#artCatebox').html()
        // });
    });

    $('tbody').on('click', '#edit', function () {
        layer.msg('该功能开发尚未完善！');
        // updatelayerindex = layer.open({
        //     type: 1,
        //     title: '修改文章分类',
        //     area: ['500px', '300px'],
        //     content: $('#dialog-edit').html()
        // });

        // var id = $(this).attr('data-id');
        // $.ajax({
        //     method: 'GET',
        //     url: '/my/article/cates/' + id,
        //     success: function (res) {
        //         // console.log(res);
        //         if (res.status != 0) {
        //             return layer.msg('信息获取失败！');
        //         }
        //         form.val('form-edit', res.data);
        //     }
        // })
    });
 
    $('tbody').on('click', '#delete', function () {
        layer.msg('该功能开发尚未完善！');
        // var id = $(this).attr('data-id');
        // console.log(id);
        // layer.confirm('确认删除？',{icon:3,title:'提示'},function(){
        //     $.ajax({
        //     method: 'GET',
        //     url: '/my/article/deletecate/' + id,
        //     success: function (res) {
        //         console.log(res);
        //         if (res.status != 0) {
        //             return layer.msg('删除分类失败！');
        //         }
        //         layer.msg('删除分类成功！');
        //         initArtCateList();
        //     }
        // });
        // });
        
    });

    $('body').on('submit', '#artCateform', function (e) {
        e.preventDefault();
        // console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    // return layer.msg('文章分类添加失败！');
                }
                layer.msg('文章分类接口有误！');
                initArtCateList();
                layer.close(layerindex);
            }
        })
    });

    //代理绑定事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('文章分类修改失败！');
                }
                layer.msg('文章分类修改成功！');
                initArtCateList();
                layer.close(updatelayerindex);
            }
        })
    });


    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg('获取文章列表失败！');
                }
                var artcate = template('tpl-table', res);
                $('#artcate').html(artcate).show();
            }
        });
    };


})