$(function() {
    //点击注册 的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //点击去登录的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从leiui中获取form对象(导入了layui这个对象就可以了)
    var form = layui.form
    var layer = layui.layer
        //通过form.verify()函数自定义
    form.verify({
        //自定义了一个叫做pwd的校验规则  [/^[\S]{6,12}$/
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            //通过形参拿到的是确认密码框中的内容
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }

        }
    })

    //监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
            //发起Ajax的post请求
        $.post('/api/reguser', { username: $('#form_reg [name = username]').val(), password: $('#form_reg [name = password]').val() }, function(res) {
            if (res.status !== 0) {
                // return alert(res.message)
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
                //注册成功后，跳转登录，模拟人的点击行为
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件    serialize()是快速获取表单数据
    //演示代码是用Ajax写的，自己去看看
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.post('/api/login',
            $(this).serialize(),
            function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                console.log(res.token);
                //将登录成功得到的token字符串，保存到local storage中
                localStorage.setItem('token', res.token)
                    //跳转到后台主页
                location.href = './index.html'
            })
    })
})