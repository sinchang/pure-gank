require(['util'], function(util) {
    util.ajaxGet(util.APIURL + 'day/history', function(res) {
        var data = {};
        data.items = res.data.results;
        util.renderTpl('history_container', 'history_container_tpl', data)
    });

	new util.Newpost();
});
