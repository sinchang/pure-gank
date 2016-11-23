require(['util', 'axios', 'moment'], function(util, axios, moment) {
    var dateEl = util.getEleById('date');
    var date = util.getUrlParam('day') || moment().format('YYYY/MM/DD');

    getData(date);

    /**
     * 获取每日的数据并渲染
     * @param date
     */
    function getData(date) {
        util.ajaxGet(util.APIURL + 'history/content/day/' + date + '', function (res) {
            var data = res.data.results;
            if (!data.length) {
                util.ajaxGet(util.APIURL + 'history/content/day/' + moment().subtract(1, 'days').format('YYYY/MM/DD') + '', function (res) {
                    data = data[0];
                    dateEl.innerHTML = date;
                    util.renderTpl('index_container', 'index_container_tpl', data);
                });
                return;
            }
            data = data[0];
            dateEl.innerHTML = date;
            util.renderTpl('index_container', 'index_container_tpl', data);
        })
    }

    /**
     * 点击 next 执行操作
     */
    util.getEleById('next').onclick = function() {
        var now = dateEl.innerHTML;
        var next = moment(now).add(1, 'days').format('YYYY/MM/DD');
        if (next > moment().format('YYYY/MM/DD')) {
            this.className = 'disabled';
            return;
        }
        dateEl.innerHTML = next;
        util.setUrlParam('day', next);
        getData(next);
    };

    /**
     * 点击 prev 执行操作
     */
    util.getEleById('prev').onclick = function() {
        var now = dateEl.innerHTML;
        var prev = moment(now).subtract(1, 'days').format('YYYY/MM/DD');
        if (prev < '2015/05/18') {
            this.className = 'disabled';
            return;
        }
        dateEl.innerHTML = prev;
        util.setUrlParam('day', prev);
        getData(prev);
    }
});
