/**
 * Created by sinchang on 2016/11/23.
 */

require(['util'], function (util) {
    var type = util.getUrlParam('type') || 1;
    var page = 1;
    var typeStr = null;

    switch (type) {
        case '1':
            typeStr = '前端';
            getData(page, typeStr, switchPage());
            break;
        case '6':
            typeStr = '福利';
            getData(page, typeStr, switchPage());
            break;
        case '2':
            typeStr = 'Android';
            getData(page, typeStr, switchPage());
            break;
        case '3':
            typeStr = 'iOS';
            getData(page, typeStr, switchPage());
            break;
        case '4':
            typeStr = '拓展资源';
            getData(page, typeStr, switchPage());
            break;
        // case '5':
        //     typeStr = '休息视频';
        //     getData(page, typeStr, switchPage());
        //     break;

    }

    /**
     * 请求分类数据
     * @param page
     * @param typeStr
     * @param cb
     */
    function getData(page, typeStr, cb) {
        if (page <= 0) {
            return;
        }
        util.ajaxGet(util.APIURL + 'data/' + typeStr + '/30/' + page + '', function (res) {
            var data = {};
            data.items = res.data.results;
            data.type = type;
            console.log(data);
            util.renderTpl('category_container', 'category_container_tpl', data);
            util.setUrlParam('page', page);
            util.getEleById('newer').setAttribute('data-page', (parseInt(page) + 1));
            util.getEleById('older').setAttribute('data-page', (parseInt(page) - 1));
            cb();
        })
    }

    /**
     * 切换上下页
     */
    function switchPage() {
        document.addEventListener('click', function (e) {
            e = e || window.event;
            console.log(e.target);
            if (e.target.getAttribute('data-page')) {
                var page = e.target.getAttribute('data-page');
                if (page <= 0) {
                    return;
                }
                getData(page, typeStr);
                window.scrollTo(0, 0);
            }
        });
    }

});
