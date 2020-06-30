$(function () {
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                // const { status, message } = res
                if (res.status !== 0) {
                    return layui.layer.msg('密码修改失败')
                }
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })

    })

    // 第二种方法
    // $('.layui-form').submit(function (e) {
    //     e.preventDefault()
    //     // 将表单内容进行分割变成数组
    //     let parmas = $(this).serialize().split('&')
    //     // parmas为数组
    //     // 将parmas数组长度变成2，只保留前两个数据（pwd，newpwd）
    //     parmas.length = 2

    //     $.ajax({
    //         type: 'POST',
    //         url: '/my/updatepwd',
    //         // 将params重新变成字符串
    //         data: parmas.join('&'),
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return layui.layer.msg('修改密码失败')
    //             }
    //             layui.layer.msg('修改密码成功')
    //             // reset是原生方法，必须将jq对象转成原生对象
    //             $('.layui-form')[0].reset()
    //         }
    //     })
    // })

    // 定义密码规则
    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function (value) {
            // 不能和旧密码相同
            if (value == $('.oldPwd').val()) {
                return '新密码不能和原密码相同'
            }
        },
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            const pwd = $('.newPwd').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
})