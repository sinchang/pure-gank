define(['axios'], function(axios) {
    var util = {
        APIURL: 'http://gank.io/api/',
        getEleById: function(id) {
            return document.getElementById(id);
        },
        /**
         * 显示loading
         */
        getLoading: function() {
            var loading = document.createElement('div');
            loading.className = 'loading';
            loading.innerHTML = '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>';
            document.body.appendChild(loading);
        },
        /**
         * 隐藏loading
         */
        removeLoading: function() {
            document.body.removeChild(document.querySelector('.loading'));
        },
        /**
         * 获取url参数
         * @param name
         * @param url
         * @returns {string}
         */
        getUrlParam: function(name, url) {
            if (!name) {
                return '';
            }
            url = url || location.search;
            name = name.replace(/(?=[\\^$*+?.():|{}])/, '\\');
            var reg = new RegExp('(?:[?&]|^)' + name + '=([^?&#]*)', 'i');
            var match = url.match(reg);
            return !match ? '' : match[1];
        },
        /**
         * 设置url参数
         * @param key
         * @param value
         */
        setUrlParam: function(key, value) {
            var s = document.location.search;
            var kvp = key + "=" + value;
            var r = new RegExp("(&|\\?)" + key + "=[^\&]*");
            s = s.replace(r, "$1" + kvp);
            if (!RegExp.$1) { s += (s.length > 0 ? '&' : '?') + kvp; };
            window.history.pushState(null, null, s);
        },
        /**
         * artTemplate 渲染
         * @param containerId
         * @param tplId
         * @param data
         */
        renderTpl: function(containerId, tplId, data) {
            util.getEleById(containerId).innerHTML = template(tplId, data);
        },
        /**
         * ajax 请求
         * @param url
         * @param callback
         */
        ajaxGet: function(url, callback) {
            util.getLoading();
            axios.get(url)
                .then(function(res) {
                    callback(res);
                    util.removeLoading();
                })
                .catch(function(error) {
                    util.removeLoading();
                    console.log(error);
                });
        }
    };

    return util;
});
