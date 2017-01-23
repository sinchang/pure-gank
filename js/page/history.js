require(['util', 'template'], function(util, template) {
    template.helper('dateFormat', function (date) {
        return date.replace(/-/g,'/');
    });

    util.ajaxGet(util.APIURL + 'day/history', function(res) {
        var data = {};
        data.items = res.data.results;
        util.renderTpl('history_container', 'history_container_tpl', data)
    });

	new util.Newpost();
});
