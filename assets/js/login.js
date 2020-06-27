$(function () {
    // 点击去注册链接
    $('#link_reg').on('click', function () {
        console.log(1)
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登陆链接
    $('#link_login').on('click', function () {
        console.log(2)
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 自定义验证规则
    const form = layui.form
    const layer = layui.layer
    form.verify({
        pwd: function (value) {
            const reg = /^[\S]{6,12}$/
            if (!reg.test(value)) {
                return '密码必须是6到12位，且不能出现空格'
            }
        },
        repwd: function (value) {
            const pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致 '
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        const inputparams = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', inputparams, function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#link_login').click()
        })
    })

    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登陆成功')
                // 将登陆成功得到的token，保存到localstorge
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })






})



