$(function() {
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function(value) {
            if (value === $('[name=oldpwd]').val()) {
                return '新旧密码不能相同!'
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newpwd]').val()) {
                return '两次密码不一致！'
            }
        }

    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            // dataType: "jsonp",
            // // jsonp: 'callBack',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                    //重置表单，jQuery无法使用，只能使用js原生方法reset
                $('.layui-form')[0].reset()
            }
        })
    })
})