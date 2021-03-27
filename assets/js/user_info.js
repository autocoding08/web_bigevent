$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    })
    initUserInfo();
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                //调用form.val()快速为表单赋值
                //这是layui中表单验证的方法，具体使用方法上layui查找
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置表单的数据
    $('#btn_reset').on('click', function(e) {
            //阻止重置事件  
            e.preventDefault();
            initUserInfo()
        })
        //监听表单提交
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        //发起Ajax
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    //调用父页面的index.js方法，重新渲染用户头像和信息
                    //index.js中有一个getuserinfo 的函数，记得要在live server中运行
                window.parent.getuserInfo()
            }
        })
    })
})