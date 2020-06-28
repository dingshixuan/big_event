$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:8090' + options.url





    if (options.url.includes('/my')) {
        options.headers = {
            'Authorization': localStorage.getItem('token')
        }
    }


    options.complete = function (res) {
        const { status, message } = res.responseJSON;
        if (status === 1 && message === '身份认证失败') {
            clearToken()
        }
    }
})