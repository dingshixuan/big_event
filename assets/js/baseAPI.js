$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:8090' + options.url
})