$(function() {

        getuserInfo();
    })
    // var layuier = layui.layuier
    //获取用户基本信息
function getuserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // Headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            console.log(res)
            if (res.status !== 0) {
                // layui.layer.
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },
        //不论是否成功失败，都会调用complete
        //每次登录都要用到token，所以直接封装到baseAPI中
        // complete: function(res) {
        //     console.log('zhixle');
        //     console.log(res)
        //         //在complete回调函数中，可以使用res.responseJSON拿到服务器响应的数据
        //     if (res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = './login.html'
        //     }
        // }
    })
}


//渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
var layer = layui.layer
    //退出按键
$('#btn_logout').on('click', function(e) {
    console.log('ok');
    //layui的代码，直接copy，不用纠结语法
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        //1.清空本地存储中的token  2.冲洗跳转登录页面
        localStorage.removeItem('token')
        location.href = './login.html'
            //关闭询问框
        layer.close(index);
    });
})