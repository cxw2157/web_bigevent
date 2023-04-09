$(function () {
    let layer = layui.layer
    let form = layui.form
  
    initCate()
    // ^ 初始化富文本编辑器
    initEditor()
  
    // ^ 定义加载文章分类的方法
    function initCate() {
      $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('初始化文章分类失败！')
          }
          // & 调用模板引擎，渲染分类的下拉菜单
          let htmlStr = template('tpl-cate', res)
          $('[name=cate_id]').html(htmlStr)
          // & 一定要记得调用 form.render() 方法,否则板引擎渲染不生效
          form.render()
        },
      })
    }
  
    // ^ 1. 初始化图片裁剪器
    let $image = $('#image')
    // ^ 2. 裁剪选项
    let options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview',
    }
    // ^ 3. 初始化裁剪区域
    $image.cropper(options)
  
    // ^ 为选择封面的按钮，绑定点击事件处理函数
    $('#btnChooseImage').on('click', function () {
      $('#coverFile').click()
    })
  
    // ^ 为选择封面按钮绑定 change 事件
    $('#coverFile').on('change', function (e) {
      // & 获取文件的列表数组
      let files = e.target.files
      // & 判断用户是否选择了文件
      if (files.length === 0) {
        return
      }
      // & 根据文件创建新的 URL 地址
      let newImgURL = URL.createObjectURL(files[0])
      // & 为裁剪区域设置新的图片
      $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', newImgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
    })
  
    // ^ 定义文章的发布状态
    let art_state = '已发布'
    // ^ 为存为草稿按钮，绑定点击事件处理函数
    $('#btnSave2').on('click', function () {
      art_state = '草稿'
    })
  
    // ^ 为表单绑定 submit 提交事件
    $('#form-pub').on('submit', function (e) {
      e.preventDefault()
      // & 1 基于当前表单快速创建一个 FormData 对象
      let fd = new FormData($(this)[0])
      // & 2 将文章的发布状态，存到fd中
      fd.append('state', art_state)
      // console.log(fd);
      // & 3 将裁剪后的图片，输出为文件
      $image.cropper('getCroppedCanvas', {width: 400, height: 280,}).toBlob(function (blob) {
          // 将 Canvas 画布上的内容，转化为文件对象
          // 得到文件对象后，进行后续的操作
          // & 4 将图片转成的文件，存到fd中
          fd.append('cover_img', blob)
          console.log(fd);
          // & 5 发起 ajax 数据请求
          publishArticle(fd)
        })
    })
  
    // ^ 定义一个发布文章的方法
    function publishArticle(fd) {
      $.ajax({
        method: 'POST',
        url: '/my/article/add',
        data: fd,
        //& 注意：如果向服务器提交的是 FormData 格式的数据，必须添加以下两个配置项
        contentType: false,
        processData: false,
        success: function (res) {
          console.log(res);
          if (res.status !== 0) {
            return layer.msg('发布文章失败！')
          }
          layer.msg('发布文章成功！')
          //& 发布文章成功后，跳转到文章列表页面
          location.href = 'http://baidu.com'
        }
      })
    }
  })
  